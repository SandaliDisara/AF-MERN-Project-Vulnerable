import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ImageGrid.css";
import DOMPurify from "dompurify";  
import { Link } from "react-router-dom";

export default function ImageGridAgriUser() {
  const [agriblogs, setAgriblogs] = useState([]);

  const setID = (_id, title, articlebody, image) => {
     // Sanitize the data before storing it in localStorage
     localStorage.setItem("title", DOMPurify.sanitize(title));
     localStorage.setItem("articlebody", DOMPurify.sanitize(articlebody));
     localStorage.setItem("image", DOMPurify.sanitize(image));
     localStorage.setItem("ID", _id);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/agriBlog/images"
        );
        setAgriblogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="image-grid" >
      {agriblogs.map((animblog) => (
        <div key={animblog._id} className="image-card">
          <div
            onClick={() =>
              setID(
                animblog._id,
                DOMPurify.sanitize(animblog.title),  // Sanitize title
                DOMPurify.sanitize(animblog.articlebody),  // Sanitize articlebody
                DOMPurify.sanitize(animblog.image)  // Sanitize image
              )
            }
          >
            <Link to={`/agriArticle`} style={{ textDecoration: "none" }}>
              <img src={DOMPurify.sanitize(animblog.image)} alt={DOMPurify.sanitize(animblog.title)} /> {/* Sanitize image and title */}
              <h2>{DOMPurify.sanitize(animblog.title)}</h2>  {/* Sanitize the title */}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
