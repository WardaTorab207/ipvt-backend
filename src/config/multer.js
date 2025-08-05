import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
       const extension = path.extname(file.originalname);
        const uniqueName = `${uuidv4()}${extension}`;
    cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
  cb(null, true); // accept all files
};

// Create upload instance
const upload = multer({ storage, fileFilter });

export default upload;