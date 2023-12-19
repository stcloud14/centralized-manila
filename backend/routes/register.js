import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();


router.get("/", async (req, res) => {
    const query = "SELECT * FROM user_reg";
    const query1 = "SELECT * FROM user_auth";
    const query2 = "SELECT * FROM user_personal";
    const query3 = "SELECT * FROM user_contact";
    const query4 = "SELECT * FROM user_gov_id";

    try {
    const result = await queryDatabase(query);
    const result1 = await queryDatabase(query1);
    const result2 = await queryDatabase(query2);
    const result3 = await queryDatabase(query3);
    const result4 = await queryDatabase(query4);
    
    res.json({ user_reg: result, user_auth: result1, user_personal: result2, user_contact: result3, user_gov_id: result4 });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
});

router.post('/check-existence', async (req, res) => {
    const { f_name, l_name, mobile_no } = req.body;
  
    const plainMobileNo = mobile_no.replace(/[-\s]/g, '');
    const primaryKey = generatePrimaryKey(f_name, l_name, plainMobileNo);
  
    const query = "SELECT * FROM user_reg WHERE user_id = ?";
    const values = [primaryKey];
  
    try {
      const result = await queryDatabase(query, values);
      if (result.length > 0) {
        res.json({ exists: true, message: "User already exists. Proceed to login." });
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
    const plainMobileNo = mobile_no.replace(/[-\s]/g, '');

    const primaryKey = generatePrimaryKey(req.body.f_name, req.body.l_name, plainMobileNo);

    const query = "INSERT INTO user_reg (`f_name`, `l_name`, `mobile_no`, `user_id`) VALUES (?, ?, ?, ?)";
    const values = [req.body.f_name, req.body.l_name, plainMobileNo, primaryKey];

    const query1 = "INSERT INTO user_auth (`mobile_no`, `user_pass`, `user_id`) VALUES (?, ?, ?)";
    const values1 = [plainMobileNo, req.body.user_pass, primaryKey];

    const query2 = "INSERT INTO user_personal (`user_id`, `f_name`, `l_name`) VALUES ( ?, ?, ?)";
    const values2 = [primaryKey, req.body.f_name, req.body.l_name];

    const query3 = "INSERT INTO user_contact (`user_id`, `mobile_no`) VALUES (?, ?)";
    const values3 = [primaryKey, req.body.mobile_no ];

    const query4 = "INSERT INTO user_gov_id (`user_id`) VALUES (?)";
    const values4 = [primaryKey];

    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);
    const result3 = await queryDatabase(query3, values3);
    const result4 = await queryDatabase(query4, values4);

    res.json({
        message: "Successfully executed",
        user_reg_result: result,
        user_auth_result: result1,
        user_personal_result: result2,
        user_contact_result: result3,
        user_gov_id_result: result4,
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