import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ImageGrid.css";
import { Link } from "react-router-dom";

export default function ImageGridAgri() {
  const [agriblogs, setAgriblogs] = useState([]);

  const setID = (_id, title, articlebody, image) => {
    localStorage.setItem("title", title);
    localStorage.setItem("articlebody", articlebody);
    localStorage.setItem("image", image);
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
    <div className="image-grid">
      {agriblogs.map((animblog) => (
        <div key={animblog._id} className="image-card">
          <div
            onClick={() =>
              setID(
                animblog._id,
                animblog.title,
                animblog.articlebody,
                animblog.image
              )
            }
          >
            <Link to={`/agriArticleEdit`} style={{ textDecoration: "none" }}>
              <img src={animblog.image} alt={animblog.title} />
              <h2>{animblog.title}</h2>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
