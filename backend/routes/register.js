import { Router } from 'express';
import conn2 from './connection.js';
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/check-existence', async (req, res) => {
    const { mobile_no, user_email } = req.body;
  
    const plainMobileNo = mobile_no.replace(/[-\s]/g, '');
  
    const query = "SELECT * FROM user_auth WHERE mobile_no = ?";
    const values = [plainMobileNo];

    const query1 = "SELECT user_email FROM user_contact WHERE user_email = ?";
    const values1 = [user_email];

    const query2 = "SELECT user_id FROM user_auth WHERE mobile_no LIKE ?";
    const values2 = [`${plainMobileNo}%+`];

    



  
    try {
      const result = await queryDatabase(query, values);
      const result1 = await queryDatabase(query1, values1);
      const result2 = await queryDatabase(query2, values2);
      if (result.length > 0) {
        res.json({ exists: true, message: "Mobile number already exists. proceed to login." });
      } else if (result1.length > 0) {
        res.json({ exists: true, message: "Email already exists. proceed to login." });
      } else if (result2.length > 0) {
        res.json({ user_existing: true, user_id: result2 });
      } else {
        res.json({ exists: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error checking user existence" });
    }
  });


router.post('/', async (req, res) => {
    const mobile_no = req.body.mobile_no;
    const user_pass = String(req.body.user_pass);
    const { photoURL } = req.body;

    

    const plainMobileNo = mobile_no.replace(/[-\s]/g, '');
    const saltRounds = 10;


    const notif_title = `Welcome, ${req.body.l_name}!`;

    const notif_message = `</span> Congratulations! Your registration with Centralized Manila was successful, and we're glad to welcome you to our platform. <span className="font-medium dark:text-white"></span>.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;


    const verification_status = 'Unverified';
    const application_status = 'New';

    const primaryKey = generatePrimaryKey(req.body.f_name, req.body.l_name, plainMobileNo);

    const query = "INSERT INTO user_reg (`f_name`, `l_name`, `mobile_no`, `user_id`) VALUES (?, ?, ?, ?)";
    const values = [req.body.f_name, req.body.l_name, plainMobileNo, primaryKey];

    const query1 = "INSERT INTO user_auth (`mobile_no`, `user_pass`, `user_id`) VALUES (?, ?, ?)";
    const hashedPassword = await bcrypt.hash(user_pass, saltRounds);
    const values1 = [plainMobileNo, hashedPassword, primaryKey];

    const query2 = "INSERT INTO user_personal (`user_id`, `f_name`, `m_name`, `l_name`, `suffix_type`, `sex_id`, `cvl_id`, `res_id`, `czn_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values2 = [
      primaryKey,
      req.body.f_name || null,
      req.body.m_name || null,
      req.body.l_name || null,
      req.body.suffix_type || null,
      req.body.sex_type || null,
      req.body.cvl_status || null,
      req.body.res_status || null,
      req.body.czn_status || null
    ];

    const query3 = "INSERT INTO user_contact (`user_id`, `mobile_no`, `user_email`) VALUES (?, ?, ?)";
    const values3 = [primaryKey, req.body.mobile_no, req.body.user_email];

    const query4 = "INSERT INTO user_gov_id (`user_id`) VALUES (?)";
    const values4 = [primaryKey];

    const query5 = "INSERT INTO user_birth (`user_id`, `birth_date`, `birth_place`) VALUES (?, ?, ?)";
    const values5 = [primaryKey, req.body.birth_date, req.body.birth_place];

    const query6 = "INSERT INTO user_image (`user_id`, `image_url`) VALUES (?, ?)";
    const values6 = [primaryKey, photoURL];

    const query7 = "INSERT INTO user_verification (`user_id`, `verification_status`, `application_status`, `user_valid_id`) VALUES (?, ?, ?, ?)";
    const values7 = [primaryKey, verification_status, application_status, req.body.user_valid_id_name];

    const query8 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values8 = [primaryKey, formattedDate, notif_title, notif_message];



    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);
    const result3 = await queryDatabase(query3, values3);
    const result4 = await queryDatabase(query4, values4);
    const result5 = await queryDatabase(query5, values5);
    const result6 = await queryDatabase(query6, values6);
    const result7 = await queryDatabase(query7, values7);
    const result8 = await queryDatabase(query8, values8);

    res.json({
        message: "Successfully executed",
        user_id: primaryKey,
        user_reg_result: result,
        user_auth_result: result1,
        user_personal_result: result2,
        user_contact_result: result3,
        user_gov_id_result: result4,
        user_birth_result: result5,
        user_image_result: result6,
        user_verification_result: result7,
        notif_result: result8,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
    }
});



router.post('/existing/:user_existing', async (req, res) => {

    const mobile_no = req.body.mobile_no;
    const user_existing = req.params.user_existing;
    const user_pass = String(req.body.user_pass);
    const { photoURL } = req.body;

    
    const primaryKey = user_existing + '+';
    

    const plainMobileNo = mobile_no.replace(/[-\s]/g, '');
    const saltRounds = 10;


    const notif_title = `Welcome, ${req.body.l_name}!`;

    const notif_message = `</span> Congratulations! Your registration with Centralized Manila was successful, and we're glad to welcome you to our platform. <span className="font-medium dark:text-white"></span>.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;


    const verification_status = 'Unverified';
    const application_status = 'New';


    const query = "INSERT INTO user_reg (`f_name`, `l_name`, `mobile_no`, `user_id`) VALUES (?, ?, ?, ?)";
    const values = [req.body.f_name, req.body.l_name, plainMobileNo, primaryKey];

    const query1 = "INSERT INTO user_auth (`mobile_no`, `user_pass`, `user_id`) VALUES (?, ?, ?)";
    const hashedPassword = await bcrypt.hash(user_pass, saltRounds);
    const values1 = [plainMobileNo, hashedPassword, primaryKey];

    const query2 = "INSERT INTO user_personal (`user_id`, `f_name`, `m_name`, `l_name`, `suffix_type`, `sex_id`, `cvl_id`, `res_id`, `czn_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values2 = [
      primaryKey,
      req.body.f_name || null,
      req.body.m_name || null,
      req.body.l_name || null,
      req.body.suffix_type || null,
      req.body.sex_type || null,
      req.body.cvl_status || null,
      req.body.res_status || null,
      req.body.czn_status || null
    ];

    const query3 = "INSERT INTO user_contact (`user_id`, `mobile_no`, `user_email`) VALUES (?, ?, ?)";
    const values3 = [primaryKey, req.body.mobile_no, req.body.user_email];

    const query4 = "INSERT INTO user_gov_id (`user_id`) VALUES (?)";
    const values4 = [primaryKey];

    const query5 = "INSERT INTO user_birth (`user_id`, `birth_date`, `birth_place`) VALUES (?, ?, ?)";
    const values5 = [primaryKey, req.body.birth_date, req.body.birth_place];

    const query6 = "INSERT INTO user_image (`user_id`, `image_url`) VALUES (?, ?)";
    const values6 = [primaryKey, photoURL];

    const query7 = "INSERT INTO user_verification (`user_id`, `verification_status`, `application_status`, `user_valid_id`) VALUES (?, ?, ?, ?)";
    const values7 = [primaryKey, verification_status, application_status, req.body.user_valid_id_name];

    const query8 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values8 = [primaryKey, formattedDate, notif_title, notif_message];



    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);
    const result3 = await queryDatabase(query3, values3);
    const result4 = await queryDatabase(query4, values4);
    const result5 = await queryDatabase(query5, values5);
    const result6 = await queryDatabase(query6, values6);
    const result7 = await queryDatabase(query7, values7);
    const result8 = await queryDatabase(query8, values8);


    res.json({
        message: "Successfully executed",
        user_id: primaryKey,
        user_reg_result: result,
        user_auth_result: result1,
        user_personal_result: result2,
        user_contact_result: result3,
        user_gov_id_result: result4,
        user_birth_result: result5,
        user_image_result: result6,
        user_verification_result: result7,
        notif_result: result8,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
    }
});



const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

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
    req.user_id = req.params.user_id;
    next();
  };


  router.post('/valid-id/:user_id', setUserMiddleware, upload1.single('user_valid_id'), async (req, res) => {
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



  router.post('/check-existence/email', async (req, res) => {
    const { email, photoURL } = req.body;
  
    const query = "SELECT user_id FROM user_contact WHERE user_email = ?";
    const values = [email];
  
    try {
      const result = await queryDatabase(query, values);
      if (result.length > 0) {
        const user_id = result[0].user_id;
  
        if (photoURL) {
          const query1 = "UPDATE user_image SET image_url = ? WHERE user_id = ?";
          const values1 = [photoURL, user_id];
  
          await queryDatabase(query1, values1);
        }
  
        res.json({ exists: true, user_id, message: "User found." });
      } else {
        res.json({ exists: false, message: "User does not exist. Proceed to register." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error checking user existence" });
    }
});


  

// router.post('/regis', async (req, res) => {
//   const email = req.body.email;
//   const displayName = req.body.displayName;
//   // const user_pass = String(req.body.user_pass);
  

//   // const plainMobileNo = mobile_no.replace(/[-\s]/g, '');
//   // const saltRounds = 10;


//   const notif_title = `Welcome`;

//   const notif_message = `</span> Congratulations! Your registration with Centralized Manila was successful, and we're glad to welcome you to our platform. <span className="font-medium dark:text-white"></span>.</p>`;
//   const date = new Date();
//   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;


//   const verification_status = 'Unverified';
//   const application_status = 'New';

//   const primaryKey = generatePrimaryGoogle(email);

//   const query = "INSERT INTO user_reg (`user_id`) VALUES (?)";
//   const values = [primaryKey];

//   const query1 = "INSERT INTO user_google (`user_id`, `email`) VALUES (?, ?)";
//   const values1 = [primaryKey, email];

//   const query2 = "INSERT INTO user_personal (`user_id`, `f_name`) VALUES (?, ?)";
//   const values2 = [primaryKey, displayName];

//   const query3 = "INSERT INTO user_contact (`user_id`) VALUES (?)";
//   const values3 = [primaryKey];

//   const query4 = "INSERT INTO user_gov_id (`user_id`) VALUES (?)";
//   const values4 = [primaryKey];

//   const query5 = "INSERT INTO user_birth (`user_id`) VALUES (?)";
//   const values5 = [primaryKey];

//   const query6 = "INSERT INTO user_image (`user_id`) VALUES (?)";
//   const values6 = [primaryKey];

//   const query7 = "INSERT INTO user_verification (`user_id`, `verification_status`, `application_status`) VALUES (?, ?, ?)";
//   const values7 = [primaryKey, verification_status, application_status];

//   const query8 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
//   const values8 = [primaryKey, formattedDate, notif_title, notif_message];



//   try {
//   const result = await queryDatabase(query, values);
//   const result1 = await queryDatabase(query1, values1);
//   const result2 = await queryDatabase(query2, values2);
//   const result3 = await queryDatabase(query3, values3);
//   const result4 = await queryDatabase(query4, values4);
//   const result5 = await queryDatabase(query5, values5);
//   const result6 = await queryDatabase(query6, values6);
//   const result7 = await queryDatabase(query7, values7);
//   const result8 = await queryDatabase(query8, values8);


//   res.json({
//       message: "Successfully executed",
//       user_id: primaryKey,
//       user_reg_result: result,
//       user_auth_result: result1,
//       user_personal_result: result2,
//       user_contact_result: result3,
//       user_gov_id_result: result4,
//       user_birth_result: result5,
//       user_image_result: result6,
//       user_verification_result: result7,
//       notif_result: result8,
//   });
//   } catch (err) {
//   console.error(err);
//   res.status(500).json({ error: "Error executing queries" });
//   }
// });


// function queryDatabase(query, values) {
//     return new Promise((resolve, reject) => {
//     conn2.query(query, values, (err, data) => {
//         if (err) {
//         reject(err);
//         } else {
//         resolve(data);
//         }
//     });
//     });
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

// function generateTransactionID() {
//   const timestamp = new Date().getTime().toString().slice(0, 8);
//   const uniqueID = uuidv4().split('-').join('').substring(0, 9); // Use a portion of UUID
//   const transactionID = `${timestamp}-${uniqueID}`;

//   return transactionID.toUpperCase();
// }

function generatePrimaryGoogle(email) {
  // Extract the first two letters of the email and convert them to uppercase
  const firstTwoLettersEmail = email.slice(0, 2).toUpperCase();

  // Get the current date and time
  const date = new Date();
  const twoDigitDate = date.getDate().toString().padStart(2, '0');
  const twoDigitSeconds = date.getSeconds().toString().padStart(2, '0');

  // Concatenate the components to create the primary key
  const primaryKey = `${firstTwoLettersEmail}${twoDigitDate}${twoDigitSeconds}`;

  console.log(primaryKey);
  return primaryKey;
}

    
function generatePrimaryKey(firstName, lastName, mobileNo) {
        // Extract the first letter of the first name
        const firstLetterFirstName = firstName.charAt(0).toUpperCase();
    
        // Extract the first letter of the last name
        const firstLetterLastName = lastName.charAt(0).toUpperCase();
    
        // Extract the last 4 digits of the mobile number
        const last4DigitsMobile = mobileNo.slice(-4);
    
        // Concatenate the components to create the primary key
        const primaryKey = `${firstLetterFirstName}${firstLetterLastName}${last4DigitsMobile}`;
    
        console.log(primaryKey)
        return primaryKey;
    }

export default router;