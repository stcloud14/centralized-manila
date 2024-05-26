import { Router } from 'express';
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import conn2 from './connection.js';

const router = Router();

router.get('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT uv.verification_status, ui.user_image, ui.image_url FROM user_verification uv LEFT JOIN user_image ui ON uv.user_id = ui.user_id WHERE uv.user_id = ?";

  try {
    const result = await queryDatabase(sql, [user_id]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user image');
  }
});

// Route to check verification status
router.get('/check_verification_status/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const query = "SELECT user_id, verification_status FROM user_verification WHERE user_id = ?";

  try {
    const results = await queryDatabase(query, [user_id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user_id: results[0].user_id, verification: results[0].verification_status });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to check application status
router.get('/check_application_status/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const query = "SELECT user_id, application_status FROM user_verification WHERE user_id = ?";

  try {
    const results = await queryDatabase(query, [user_id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user_id: results[0].user_id, application: results[0].application_status });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/uploads/profileImage'));
    },
    filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname);
      req.uniqueFileName = `${originalName.name}_${req.user_id}${originalName.ext}`;
      cb(null, req.uniqueFileName);
    },
  });

  const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/uploads/verification'));
    },
    filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname);
      req.uniqueFileName = `${originalName.name}_${req.user_id}${originalName.ext}`;
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

  const upload1 = multer({
    storage: storage1,
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
    // console.log('Before Middleware - req.user_id:', req.user_id);
    req.user_id = req.params.user_id;
    // console.log('After Middleware - req.user_id:', req.user_id);
    next();
  };

  router.post('/uploadimage/:user_id', setUserMiddleware, upload.single('user_img'), async (req, res) => {
    // console.log('User ID during file upload:', req.user_id);

    const user_id = req.params.user_id;
    const uniqueFileName = req.uniqueFileName;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      // Check if the user already has an image in the database

      const existingImage = await queryDatabase("SELECT user_image FROM user_image WHERE user_id = ?", [user_id]);

      if (existingImage && existingImage.length > 0) {
        // If an image exists, update the record
        await queryDatabase("UPDATE user_image SET `user_image` = ? WHERE `user_id` = ?", [uniqueFileName, user_id]);
      } else {
        // If no image exists, insert a new record
        await queryDatabase("INSERT INTO user_image (`user_id`, `user_image`) VALUES (?, ?)", [user_id, uniqueFileName]);
      }

      res.json({
        success: true,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ success: false, message: 'File upload failed' });
    }
  });

  router.post('/applyverify/:user_id', setUserMiddleware, upload1.single('user_valid_id'), async (req, res) => {
    const user_id = req.params.user_id;
    const uniqueFileName = req.uniqueFileName;

    const status = 'Applying';

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      // Check if the user already has a verification image in the database
      const existingVerification = await queryDatabase("SELECT user_valid_id FROM user_verification WHERE user_id = ?", [user_id]);

      if (existingVerification && existingVerification.length > 0) {
        // If a verification image exists, update the record
        await queryDatabase("UPDATE user_verification SET `user_valid_id` = ?, `application_status` = ? WHERE `user_id` = ?", [uniqueFileName, status, user_id]);
      } else {
        // If no verification image exists, insert a new record
        await queryDatabase("INSERT INTO user_verification (`user_id`, `user_valid_id`, `application_status`) VALUES (?, ?, ?)", [user_id, uniqueFileName, status]);
      }

      res.json({
        success: true,
        message: "File uploaded successfully",
      });

    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ success: false, message: 'File upload failed' });
    }
  });

  router.delete('/removeimage/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const sql = "DELETE FROM user_image WHERE user_id = ?";

    try {
      // Delete the user image from the database
      const result = await queryDatabase(sql, [user_id]);

      res.json({
        success: true,
        result: result,
        message: "File deleted successfully",
      });

    } catch (error) {
      console.error('Error during file deletion:', error);
      res.status(500).json({ success: false, message: 'File deletion failed' });
    }
  });

  router.delete('/accdelete/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const sql = "UPDATE user_reg SET is_deleted = 1 WHERE user_id = ?";
    const sql1 = "UPDATE user_auth SET mobile_no = CONCAT(mobile_no, '#') WHERE user_id = ?";
    const sql2 = "UPDATE user_contact SET mobile_no = CONCAT(mobile_no, '#') WHERE user_id = ?";

    try {
      // Delete the user account from the database
      const result = await queryDatabase(sql, [user_id]);
      queryDatabase(sql1, [user_id]);
      await queryDatabase(sql2, [user_id]);

      res.json({
        message: "User successfully deleted",
        deleted_acc_result: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error executing queries" });
    }
  });

// function queryDatabase(query, values) {
//   return new Promise((resolve, reject) => {
//     conn2.query(query, values, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }



async function queryDatabase(query, values) {
  try {
      const connection = await conn2.getConnection();
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

function generateTransactionID() {
  const timestamp = new Date().getTime().toString().slice(0, 8);
  const uniqueID = uuidv4().split('-').join('').substring(0, 9);
  const transactionID = `${timestamp}-${uniqueID}`;

  return transactionID.toUpperCase();
}

function generateUniqueFileID() {
  const uniqueFileID = uuidv4().split('-').join('').substring(0, 5);

  return uniqueFileID.toUpperCase();
}

export default router;
