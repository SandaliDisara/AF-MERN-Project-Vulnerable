const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const Image = require("../Models/AgriBlog");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/Assets/agriBlogs");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1, // 1MB file size limit
  },
});

// Rate limiter for upload endpoint
const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

// Helper function to validate file paths
function isValidFilePath(filePath) {
  const resolvedPath = path.resolve(filePath);
  return resolvedPath.startsWith(path.resolve("../client/public/Assets/agriBlogs"));
}

// Upload file route
router.post("/upload", uploadRateLimiter, upload.single("image"), async (req, res, next) => {
  try {
    const { title, articlebody } = req.body;

    // Validate required fields
    if (!title || !articlebody || !req.file) {
      return res.status(400).json({ message: "Title, article body, and image file are required." });
    }

    const { filename: imageName } = req.file; // Now safe to access req.file
    const imagePath = `/Assets/agriBlogs/${imageName}`;

    // Save image record to MongoDB
    const image = await Image.create({
      title,
      articlebody,
      image: imagePath,
    });
    res.json(image);
  } catch (error) {
    // Attempt to remove the uploaded file if it exists
    if (req.file && isValidFilePath(`../client/public/Assets/agriBlogs/${req.file.filename}`)) {
      fs.unlinkSync(`../client/public/Assets/agriBlogs/${req.file.filename}`);
    }
    next(error); // Forward error to global error handler
  }
});


// Get all images route
router.get("/images", async (req, res, next) => {
  try {
    const images = await Image.find({}, { title: 1, articlebody: 1, image: 1 });
    res.json(images);
  } catch (error) {
    next(error); // Forward error to global error handler
  }
});

// Delete an image route
router.delete("/images/:id", async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Validate and delete the image file
    const filePath = path.join(__dirname, "../../client/public", image.image);
    if (fs.existsSync(filePath) && isValidFilePath(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
    }

    // Delete image record from MongoDB
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image removed" });
  } catch (error) {
    next(error); // Forward error to global error handler
  }
});

// Update an image record route
router.put("/images/:id", upload.single("image"), async (req, res, next) => {
  try {
    const { title, articlebody } = req.body;
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Replace old image if a new one is uploaded
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
    next(error); // Forward error to global error handler
  }
});

module.exports = router;
