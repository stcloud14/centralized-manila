import { Router } from 'express';
import conn2 from './connection.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/check-existence', async (req, res) => {
    const { mobile_no } = req.body;
  
    const plainMobileNo = mobile_no.replace(/[-\s]/g, '');
  
    const query = "SELECT * FROM user_auth WHERE mobile_no = ?";
    const values = [plainMobileNo];
  
    try {
      const result = await queryDatabase(query, values);
      if (result.length > 0) {
        res.json({ exists: true, message: "Mobile number already exists. Please use another or proceed to login." });
      } else {
        res.json({ exists: false, message: "User does not exist. Proceed to register." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error checking user existence" });
    }
  });


router.post('/', async (req, res) => {
    const mobile_no = req.body.mobile_no;
    const user_pass = String(req.body.user_pass);
    

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

    const query2 = "INSERT INTO user_personal (`user_id`, `f_name`, `l_name`) VALUES ( ?, ?, ?)";
    const values2 = [primaryKey, req.body.f_name, req.body.l_name];

    const query3 = "INSERT INTO user_contact (`user_id`, `mobile_no`, `user_email`) VALUES (?, ?, ?)";
    const values3 = [primaryKey, req.body.mobile_no, req.body.user_email];

    const query4 = "INSERT INTO user_gov_id (`user_id`) VALUES (?)";
    const values4 = [primaryKey];

    const query5 = "INSERT INTO user_birth (`user_id`) VALUES (?)";
    const values5 = [primaryKey];

    const query6 = "INSERT INTO user_image (`user_id`) VALUES (?)";
    const values6 = [primaryKey];

    const query7 = "INSERT INTO user_verification (`user_id`, `verification_status`, `application_status`) VALUES (?, ?, ?)";
    const values7 = [primaryKey, verification_status, application_status];

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
  const uniqueID = uuidv4().split('-').join('').substring(0, 9); // Use a portion of UUID
  const transactionID = `${timestamp}-${uniqueID}`;

  return transactionID.toUpperCase();
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