import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateAgriBlog from "./UpdateAgriBlog";
import "./css/Blog.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
const AgriBlog = () => {
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [articlebody, setArticlebody] = useState("");
  const [image, setImage] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false); // add this state
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(localStorage.getItem("title"));
    setArticlebody(localStorage.getItem("articlebody"));
    setImage(localStorage.getItem("image"));
    setID(localStorage.getItem("ID"));
  }, []);
  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };
  const handleUpdateClick = () => {
    setIsUpdateOpen(true);
  };
  const handleDeleteConfirm = () => {
    axios
      .delete(`http://139.144.14.151:8070/agriBlog/images/${id}`)
      .then(() => {
        console.log("Deleted");
        navigate("/agriServices");
      })
      .catch((error) => {
        console.error(error);
      });
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  return (
    <div className="artcile-container">
      <h2 className="article-title" style={{color: "#1a8b1f"}}>{title}</h2>
      <img className="blogimage" src={image} />
      <p className="articlebody">{articlebody}</p>
      {isUpdateOpen && <UpdateAgriBlog />}{" "}
      {/* render UpdateAgriBlog when isUpdateOpen is true */}
    </div>
  );
};
export default AgriBlog;
