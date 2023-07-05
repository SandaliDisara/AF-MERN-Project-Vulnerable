import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./css/Blogform.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  textField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green", // change the border color when focused
    },
  },
});

export default function UpdateBlog() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [articlebody, setArticlebody] = useState("");
  const [image, setImage] = useState(null);
  const [ID, setID] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setTitle(localStorage.getItem("title"));
    setArticlebody(localStorage.getItem("articlebody"));
    setImage(localStorage.getItem("image"));
    setID(localStorage.getItem("ID"));
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleArticleBodyChange = (event) => {
    setArticlebody(event.target.value);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = () => {
    axios.put("http://localhost:8070/imageTest/update/" + ID, {
      title,
      articlebody,
      image,
    });
    navigate("/allBlogstaff");
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://localhost:8070/imageTest/delete/${ID}`)
      .then(() => {
        console.log("Deleted");
        navigate("/allBlogstaff");
      })
      .catch((error) => {
        console.error(error);
      });
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="animalblogform">
      <p className="formTopic">Add Animal Blog</p>
      <form>
        <img src={image} style={{ width: "100%", height: "auto" }} />
        <br />
        <br />
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
          label="Article Body"
          value={articlebody}
          multiline
          rows={10}
          style={{ width: "100%" }}
          className={classes.textField}
          onChange={handleArticleBodyChange}
        />
        <br />
        <br />
        <br />
        <div className="buttons" style={{ display: "flex", gap: "1rem" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{ backgroundColor: "green", color: "white", width: "20%" }}
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className="delete-button"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
        <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>
            {"Are you sure you want to delete this post?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
