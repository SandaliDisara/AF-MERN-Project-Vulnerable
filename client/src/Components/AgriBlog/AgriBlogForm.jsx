import React, { useState } from "react";
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
          },
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
      setError(error.response.data.error);
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
