import multer from "multer";
import path from "path";
import fs from "fs";

// Define the path for the uploads directory
const uploadDir = path.join(process.cwd(), "uploads");

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  console.log("Creating uploads directory...");
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true ensures that subdirectories are created if needed
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set the destination folder to 'uploads'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname; // Create a unique filename using the current timestamp and original filename
    cb(null, uniqueSuffix); // Set the file name in the uploads directory
  },
});

export const upload = multer({ storage }); // Initialize multer with the storage configuration
