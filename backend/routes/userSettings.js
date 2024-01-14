import { Router } from 'express';
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import conn2 from './connection.js';

const router = Router();


  router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = "SELECT ui.user_image, uv.verification_status FROM user_image ui JOIN user_verification uv ON ui.user_id = uv.user_id WHERE ui.user_id = ?";
    conn2.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving user image');
        } else {
            res.json(result);
        }
    });
  });


  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/uploads/profileImage')); //frontend directory
      // cb(null, path.join(__dirname, '../uploads')); //backend directory
    },
    filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname);
      req.uniqueFileName = `${originalName.name}_${req.user_id}${originalName.ext}`;
      cb(null, req.uniqueFileName);
    },
  });


  const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/uploads/verification')); //frontend directory
      // cb(null, path.join(__dirname, '../uploads')); //backend directory
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
      // Validate file type (allow only images)
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
      // Validate file type (allow only images)
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
    req.user_id = req.params.user_id;
    next();
  };

  router.post('/uploadimage/:user_id', setUserMiddleware, upload.single('user_img'), async (req, res) => {
    const user_id = req.params.user_id;
    const uniqueFileName = req.uniqueFileName;
  
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
  
    try {
      const query = "UPDATE user_image SET `user_image` = ? WHERE `user_id` = ?";
      const values = [uniqueFileName, user_id];
      
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


  router.post('/applyverify/:user_id', setUserMiddleware, upload1.single('user_valid_id'), async (req, res) => {
    const user_id = req.params.user_id;
    const uniqueFileName = req.uniqueFileName;

    const status = 'Applying';
  
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
  
    try {
      const query = "UPDATE user_verification SET `user_valid_id` = ? WHERE `user_id` = ?";
      const values = [uniqueFileName, user_id];

      const query1 = "UPDATE user_verification SET `application_status` = ? WHERE `user_id` = ?";
      const values1 = [status, user_id];
      
      const result = await queryDatabase(query, values);
      const result1 = await queryDatabase(query1, values1);
      
      res.json({
        success: true,
        message: "File uploaded successfully",
        file_uploaded: result,
        status_updated: result1,
      });

    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ success: false, message: 'File upload failed' });
    }
  });
  

  router.delete('/removeimage/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    try {
      const query = "DELETE FROM user_image WHERE user_id = ?";
      const values = [user_id];
      
      const result = await queryDatabase(query, values);
      
      res.json({
        success: true,
        message: "File deleted successfully",
      });

    } catch (error) {
      console.error('Error during file deletion:', error);
      res.status(500).json({ success: false, message: 'File deletion failed' });
    }
  });





  // router.delete('/accdelete/:user_id:/transaction_id', async (req, res) => {
  router.delete('/accdelete/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    // SQL query to delete user account
    const sql1 = "DELETE FROM user_auth WHERE user_id = ?";
    const sql2 = "DELETE FROM user_reg WHERE user_id = ?";
    const sql3 = "DELETE FROM user_personal WHERE user_id = ?";
    const sql4 = "DELETE FROM user_contact WHERE user_id = ?";
    const sql5 = "DELETE FROM user_gov_id WHERE user_id = ?";
    const sql6 = "DELETE FROM birth_info WHERE user_id = ?";
    // const sql7 = "DELETE FROM address_info WHERE user_id = ?";
    

    try {
        // Pass user_id as a parameter to the queryDatabase function
        const result1 = await queryDatabase(sql1, [user_id]);
        const result2 = await queryDatabase(sql2, [user_id]);
        const result3 = await queryDatabase(sql3, [user_id]);
        const result4 = await queryDatabase(sql4, [user_id]);
        const result5 = await queryDatabase(sql5, [user_id]);
        const result6 = await queryDatabase(sql6, [user_id]);
        // const result7 = await queryDatabase(sql7, [user_id]);
        res.json({
            message: "Successfully executed",
            user_auth_result: result1,
            user_reg_result: result2,
            user_personal_result: result3,
            user_contact_result: result4,
            user_gov_id_result: result5,
            birth_info_result: result6,
            // address_info_result: result7,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
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