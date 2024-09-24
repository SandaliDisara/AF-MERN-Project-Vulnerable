import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // import the useNavigate hook
import "./css/Blogform.css";

const useStyles = makeStyles({
  textField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green", // change the border color when focused
    },
  },
});

export default function AgriBlogForm() {
  const classes = useStyles();
  const navigate = useNavigate(); // initialize the useNavigate hook
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [articlebody, setArticlebody] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");  // State to store CSRF token

 // Fetch the CSRF token when the component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {       
        const response = await fetch("http://localhost:8070/get-csrf-token", {
          method: "GET",
          credentials: "include",  // Include credentials to allow cookies
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);  // Store the CSRF token in state
        console.log("CSRF token fetched successfully");
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validFileTypes.includes(file.type)) {
      alert("Invalid file type. Please select a JPEG. PNG pr JPG image.");
      return;
    }
    setFile(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleArticlebodyChange = (event) => {
    setArticlebody(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("articlebody", articlebody);

      const response = await axios.post(
        "http://localhost:8070/agriBlog/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "CSRF-Token": csrfToken,  // Include CSRF token in the headers
          },
          withCredentials: true,  // Ensure credentials like cookies are sent
        }
      );
      setImage(response.data);
      toast.success("Article Uploaded");

      // Clear the form
      setFile("");
      setTitle("");
      setError("");

      // Use navigate to redirect to the specified route
      navigate("/agriServices");
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animalblogform">
      <p className="formTopic">Agriculture Extension Service Blog</p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Title"
          value={title}
          className={classes.textField}
          onChange={handleTitleChange}
        />
        <br />
        <br />
        <br />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={10}
          style={{ width: "100%" }}
          className={classes.textField}
          onChange={handleArticlebodyChange}
        />
        <br />
        <br />
        <br />
        <Input type="file" onChange={handleFileChange} />
        <br />
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{ backgroundColor: "green", color: "white", width: "20%" }}
          disabled={!file || loading}
        >
          Post
        </Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
