import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/ImageGrid.css";

export default function AllBlogsStaff() {
  const [animblogs, setAnimblogs] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/imageTest/images"
        );
        setAnimblogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const setID = (_id, title, articlebody, image) => {
    localStorage.setItem("title", title);
    localStorage.setItem("articlebody", articlebody);
    localStorage.setItem("image", image);

    localStorage.setItem("ID", _id);
  };

  return (
    <div className="image-grid">
      {animblogs.map((animblog) => (
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
            <Link to={`/blogUpdate`} style={{ textDecoration: "none" }}>
              <img src={animblog.image} alt={animblog.title} />
              <h2>{animblog.title}</h2>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
