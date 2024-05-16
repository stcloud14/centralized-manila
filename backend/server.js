import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import conn2 from './connection.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDestination = path.join(__dirname, 'frontend', 'src', 'uploads');

// Middleware for security headers
app.use(helmet());

// Set up multer storage with validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDestination);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, 'file-' + uniqueSuffix + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.post('/api/upload/:transaction_id', upload.single('file'), async (req, res) => {
  try {
    const transID = req.params.transaction_id;
    const filePath = req.file.path;

    const query = "INSERT INTO bus_images (`transaction_id`, `bus_dti_reg`) VALUES (?, ?)";
    const values = [transID, filePath];

    const result = await queryDatabase(query, values);

    res.json({
      success: true,
      message: "File uploaded successfully",
      file_uploaded: result,
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ success: false, message: 'File upload failed' });
  }
});

function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    conn2.query(query, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Error handling middleware for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Uploaded files will be stored in: ${uploadDestination}`);
});
