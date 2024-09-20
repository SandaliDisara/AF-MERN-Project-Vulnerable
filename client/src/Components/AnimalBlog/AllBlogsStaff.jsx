import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/ImageGrid.css";
import DOMPurify from "dompurify";

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
   // Sanitize the data before storing it in localStorage
   localStorage.setItem("title", DOMPurify.sanitize(title));
   localStorage.setItem("articlebody", DOMPurify.sanitize(articlebody));
   localStorage.setItem("image", DOMPurify.sanitize(image));
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
                DOMPurify.sanitize(animblog.title),
                DOMPurify.sanitize(animblog.articlebody),
                DOMPurify.sanitize(animblog.image)
              )
            }
          >
            <Link to={`/blogUpdate`} style={{ textDecoration: "none" }}>
              <img src={animblog.image} alt={DOMPurify.sanitize(animblog.title)} /> {/* Sanitize the title */}
              <h2>{DOMPurify.sanitize(animblog.title)}</h2> {/* Sanitize the title */}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
