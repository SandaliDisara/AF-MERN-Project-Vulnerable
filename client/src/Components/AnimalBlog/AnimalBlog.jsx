import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import "./css/ImageGrid.css";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// the commented statement are not used uncomment them if you want to use them
const AnimalBlog = () => {
  const [title, setTitle] = useState("");
  const [articlebody, setArticlebody] = useState("");
  const [image, setImage] = useState("");
  // const [ID, setID] = useState(null);

  useEffect(() => {
     // Sanitize before setting the state
     setTitle(DOMPurify.sanitize(localStorage.getItem("title")));
     setArticlebody(DOMPurify.sanitize(localStorage.getItem("articlebody")));
     setImage(DOMPurify.sanitize(localStorage.getItem("image")));
  }, []);

  return (
    <div className="artcile-container">
      <h2 className="article-title" style={{ color: "#1a8b1f"}}>{title}</h2>
      <img className="blogimage" src={image} />
      <p className="articlebody">{articlebody}</p>
    </div>
  );
};

export default AnimalBlog;
