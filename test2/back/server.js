const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

// Keep track of uploaded videos
const uploadedVideos = [];

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname + "-" + uniqueSuffix;
    uploadedVideos.push(filename); // Add the filename to the list
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("video"), (req, res) => {
  // Handle video upload
  const videoPath = req.file.path;
  res.json({ videoPath });
});

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Endpoint to get the list of uploaded videos
app.get("/videos", (req, res) => {
  res.json({ videos: uploadedVideos });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
