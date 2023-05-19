import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// the commented statement are not used uncomment them if you want to use them
const AnimalBlog = () => {
  const [title, setTitle] = useState("");
  const [articlebody, setArticlebody] = useState("");
  const [image, setImage] = useState("");
  // const [ID, setID] = useState(null);

  useEffect(() => {
    setTitle(localStorage.getItem("title"));
    setArticlebody(localStorage.getItem("articlebody"));
    setImage(localStorage.getItem("image"));
    // setID(localStorage.getItem("ID"));
  }, []);

  return (
    <div className="artcile-container">
      <h2 className="article-title" style={{color: "#1a8b1f"}}>{title}</h2>
      <img className="blogimage" src={image} />
      <p className="articlebody">{articlebody}</p>
    </div>
  );
};

export default AnimalBlog;
