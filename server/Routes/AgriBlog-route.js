const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const Image = require("../Models/AgriBlog");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, "../client/public/Assets/agriBlogs");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Validate file paths to prevent path traversal
function isValidFilePath(filePath) {
  const resolvedPath = path.resolve(filePath);
  return resolvedPath.startsWith("../client/public/Assets/agriBlogs");  // Ensure the path is within allowed directory
}

// Upload file to server
router.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    const { title, articlebody } = req.body;
    const { filename: imageName } = req.file;
    const imagePath = `/Assets/agriBlogs/${imageName}`;

    // Save file path to MongoDB
    const image = await Image.create({
      title,
      articlebody,
      image: imagePath,
    });
    res.json(image);
  } catch (error) {
    console.error(error);
    const filePath = path.join("../client/public/Assets/agriBlogs", req.file.filename);
    if (isValidFilePath(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Forward the error to the error handler middleware
    next(error);
    
    // res.status(500).json({ error: "Server error" });
  }
});

// Get all images
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find({}, { title: 1, articlebody: 1, image: 1 });
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//delete a record
router.delete("/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Construct the correct path to the file
    const filePath = path.join(__dirname, "../../client/public", image.image); 

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
    } else {
      console.error(`File not found: ${filePath}`);
    }

    // Remove image record from MongoDB
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: "Image removed" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a record
router.put("/images/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, articlebody } = req.body;
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    if (req.file) {
      const oldImagePath = path.join(`../client/public${image.image}`);
      if (isValidFilePath(oldImagePath) && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      image.image = `/Assets/agriBlogs/${req.file.filename}`;
    }

    image.title = title;
    image.articlebody = articlebody;
    await image.save();

    res.json({ message: "Image updated", image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
