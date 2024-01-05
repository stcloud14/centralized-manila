import express from "express";
import multer from "multer";
import path from "path";
import conn2 from './connection.js';

const app = express();
const PORT = 8080;

const uploadDestination = path.join(__dirname, 'frontend', 'src', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDestination);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.post('/api/upload', upload.single('image'), async (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Uploaded files will be stored in: ${uploadDestination}`);
});
