import { Router } from 'express';
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import conn1 from './connection1.js';

const router = Router();

  router.get('/:admin_type/:admin_uname', async (req, res) => {
    const admin_type = req.params.admin_type;
    const admin_uname = req.params.admin_uname;
    const sql = "SELECT admin_image FROM admin_profile WHERE admin_type = ? AND admin_name = ?";

    try {
      const result = await queryDatabase(sql, [admin_type, admin_uname]);

      res.json(result);

    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ success: false, message: 'File upload failed' });
    }
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/uploads/adminImages'));
    },
    filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname);
      req.uniqueFileName = `${originalName.name}_${req.admin_type}${originalName.ext}`;
      cb(null, req.uniqueFileName);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const allowedFormats = ['.jpg', '.jpeg', '.png'];
      const extname = path.extname(file.originalname).toLowerCase();
      if (allowedFormats.includes(extname)) {
        return cb(null, true);
      } else {
        return cb(new Error('Invalid file format. Please upload a JPEG or PNG image.'));
      }
    },
  });

  const setUserMiddleware = (req, res, next) => {
    // console.log('Before Middleware - req.admin_type:', req.admin_type);
    req.admin_type = req.params.admin_type;
    // console.log('After Middleware - req.admin_type:', req.admin_type);
    next();
  };

  router.post('/uploadimage/:admin_type/:admin_uname', setUserMiddleware, upload.single('user_img'), async (req, res) => {

    const admin_type = req.params.admin_type;
    const admin_uname = req.params.admin_uname;
    const uniqueFileName = req.uniqueFileName;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      // Check if the user already has an image in the database
      const existingImage = await queryDatabase("SELECT admin_image FROM admin_profile WHERE admin_type = ? AND admin_name = ?", [admin_type, admin_uname]);

      await queryDatabase("UPDATE admin_profile SET `admin_image` = ? WHERE `admin_type` = ? AND admin_name = ?", [uniqueFileName, admin_type, admin_uname]);

      res.json({
        success: true,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ success: false, message: 'File upload failed' });
    }
  });


  router.delete('/removeimage/:admin_type/:admin_uname', async (req, res) => {
    const admin_type = req.params.admin_type;

    try {
      // Delete the user image from the database
      await queryDatabase("UPDATE admin_profile SET admin_image = NULL WHERE admin_type = ?", [admin_type]);

      res.json({
        success: true,
        message: "File deleted successfully",
      });

    } catch (error) {
      console.error('Error during file deletion:', error);
      res.status(500).json({ success: false, message: 'File deletion failed' });
    }
  });


    // function queryDatabase(query, values) {
    // return new Promise((resolve, reject) => {
    //     conn1.query(query, values, (err, data) => {
    //     if (err) {
    //         reject(err);
    //     } else {
    //         resolve(data);
    //     }
    //     });
    // });
    // }

    async function queryDatabase(query, values) {
      try {
        const connection = await conn1.getConnection();
        try {
          const [rows] = await connection.query(query, values);
          return rows;
        } finally {
          connection.release();
        }
      } catch (err) {
        throw err;
      }
    }


export default router;
