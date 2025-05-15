import multer from "multer";
import path from "path";
import fs from "fs";

// Define the path for the testimonial images directory inside the public folder
const uploadDir = path.join(process.cwd(), "public", "images", "testimonial");

// Ensure the 'testimonial' directory exists inside the public/images folder
if (!fs.existsSync(uploadDir)) {
  console.log("Creating testimonial directory...");
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true ensures subdirectories are created if needed
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set the destination folder to 'public/images/testimonial'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname; // Create a unique filename using the current timestamp and original filename
    cb(null, uniqueSuffix); // Set the file name in the 'testimonial' directory
  },
});

export const upload = multer({ storage }); // Initialize multer with the storage configuration
