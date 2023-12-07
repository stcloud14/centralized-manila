import { Router } from 'express';
import conn2 from './connection.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// router.get('/getfullname/:user_id', (req, res) => {
//   const user_id = req.params.user_id;
//   conn2.query(
//     'SELECT concat (l_name, ", ", f_name, " ", m_name ) AS Fullname from clientdatabase.user_personal where user_id = ?',
//     [user_id],
//     (error, results, fields) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.status(200).json(results);
//       }
//     }
//   );
// });

// router.get('/rptaxpayment/', async (req, res) => {
//   const query = "SELECT * FROM rp_tax";
//   const query1 = "SELECT * FROM transaction_info";

//   try {
//   const result = await queryDatabase(query);
//   const result1 = await queryDatabase(query1);

  
//   res.json({ user_reg: result, user_auth: result1 });
//   } catch (err) {
//   console.error(err);
//   res.status(500).send('Error retrieving data');
//   }
// });
// //     acc_name,
// //     rp_tdn,
// //     rp_pin,
// //     rp_year,
// //     period,
// //     transaction_id,

// router.post('/rptaxpayment/', async (req, res) => {
//   const primaryKey = generatePrimaryKey(req.body.rp_tdn, req.body.rp_pin);

//   // const query = "INSERT INTO rp_tax (`acc_name`, `rp_tdn`, `rp_pin`, `rp_year`, `period`, `transaction_id`) VALUES (?, ?, ?, ?, ?)";
//   // const values = [req.body.f_name, req.body.l_name, req.body.mobile_no, primaryKey];

//   // const query1 = "INSERT INTO transaction_infor (`amount`, `user_pass`, `transaction_id`) VALUES (?, ?)";
//   // const values1 = [req.body.amount, primaryKey];

//   try {
//   const result = await queryDatabase(query, values);
//   const result1 = await queryDatabase(query1, values1);


//   res.json({
//       message: "Successfully executed",
//       rp_tax_result: result,
//       transaction_id_result: result1,

//   });
//   } catch (err) {
//   console.error(err);
//   res.status(500).json({ error: "Error executing queries" });
//   }
// });


// function queryDatabase(query, values) {
//   return new Promise((resolve, reject) => {
//   conn2.query(query, values, (err, data) => {
//       if (err) {
//       reject(err);
//       } else {
//       resolve(data);
//       }
//   });
//   });
// }

// function generatePrimaryKey(rp_tdn, rp_pin) {

//   // Extract the last 4 digits of the mobile number
//   const last4DigitsTdn = rp_tdn.slice(-4);

//   const last4DigitsPin = rp_pin.slice(-4);

//   // Concatenate the components to create the primary key
//   const primaryKey = `${last4DigitsTdn}${last4DigitsPin}`;

//   console.log(primaryKey)
//   return primaryKey;
// }




// router.post('/rptaxpayment/', async (req, res) => {
//   const {
//     acc_name,
//     rp_tdn,
//     rp_pin,
//     rp_year,
//     period,
//     transaction_id,
//   } = req.body;
//   console.log(req.body);

//   if (transaction_id) {
//     // If transaction_id is provided, update the existing record
//     const updateQuery = `
//       UPDATE rp_tax
//       SET acc_name = ?, rp_tdn = ?, rp_pin = ?, year = ?, period = ?
//       WHERE transaction_id = ?`;
//     const updateValues = [acc_name, rp_tdn, rp_pin, rp_year, period, transaction_id];

//     try {
//       const updateResult = await queryDatabase(updateQuery, updateValues);
//       res.status(200).json({ message: 'Update successful', updateResult });
//     } catch (updateErr) {
//       console.error(updateErr);
//       res.status(500).json({ error: 'Error updating record' });
//     }
//   } else {
//     // If transaction_id is not provided, insert a new record
//     const primaryKey = generateTransactionId(rp_pin, rp_tdn);

//     const insertQuery = `
//       INSERT INTO rp_tax (acc_name, rp_tdn, rp_pin, year, period, transaction_id)
//       VALUES (?, ?, ?, ?, ?, ?)`;
//     const insertValues = [acc_name, rp_tdn, rp_pin, rp_year, period, primaryKey];

//     try {
//       const insertResult = await queryDatabase(insertQuery, insertValues);
//       res.status(200).json({ message: 'Insert successful', insertResult });
//     } catch (insertErr) {
//       console.error(insertErr);
//       res.status(500).json({ error: 'Error inserting record' });
//     }
//   }
// });

// router.get("/rptaxpayment/", async (req, res) => {
//   const query = "SELECT * FROM rp_tax";

//   try {
//     const result = await queryDatabase(query);
//     res.json({ rp_tax: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving data');
//   }
// });

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

// function generateTransactionId(rp_pin, rp_tdn) {
//   const lastTwoDigitsRpPin = rp_pin.slice(-2);
//   const lastDigitRpTdn = rp_tdn.slice(-2);
  
//   // Appending a timestamp to ensure uniqueness
  
//   return `${lastTwoDigitsRpPin}${lastDigitRpTdn}`;
// }

router.get('/payment/', async (req, res) => {

    const query = "SELECT * FROM user_transaction";
    const query1 = "SELECT * FROM rptax_payment";
    const query2 = "SELECT * FROM transaction_info";
  
    try {
    const result = await queryDatabase(query);
    const result1 = await queryDatabase(query1);
    const result2 = await queryDatabase(query2);
  
    
    res.json({ user_transaction: result, rptax_payment: result1, transaction_info: result2 });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });
  
  
  router.post('/payment/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const rptdn = req.body.rp_tdn;
    const rppin = req.body.rp_pin;
    const amount = req.body.amount;
    const plainRptdn = rptdn.replace(/-/g, '');
    const plainRppin = rppin.replace(/-/g, '');
    const plainAmount = amount.replace(/,/g, '');
    const transID = generateTransactionID(req.body.rp_tdn, req.body.rp_pin);
    const transType = '1';
    const statusType = 'Pending';
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const query = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`) VALUES (?, ?, ?, ?, ?)";
    const values = [transID, user_id, transType, statusType, formattedDate];
  
    const query1 = "INSERT INTO rptax_payment (`acc_name`, `rp_tdn`, `rp_pin`, `year_id`, `period_id`, `transaction_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values1 = [req.body.acc_name, plainRptdn, plainRppin, req.body.rp_year, req.body.period, transID];
  
    const query2 = "INSERT INTO transaction_info (`amount`, `transaction_id`) VALUES (?, ?)";
    const values2 = [plainAmount, transID];
  
    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);
  
  
    res.json({
        message: "Successfully executed",
        user_transaction_result: result,
        rptax_payment_result: result1,
        transaction_info_result: result2,
  
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
    }
  });


  router.get('/clearance/:user_id', async (req, res) => {

    const query4 = "SELECT * FROM rptax_clearance";
    const query5 = "SELECT * FROM user_transaction";
  
    try {
    const result4 = await queryDatabase(query4);
    const result5 = await queryDatabase(query5);

  
    
    res.json({rptax_clearance: result4, user_transaction: result5});
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });
  
  router.post('/clearance/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const rptdn = req.body.rp_tdn;
    const rppin = req.body.rp_pin;
    const plainRptdn = rptdn.replace(/-/g, '');
    const plainRppin = rppin.replace(/-/g, '');
    const transID = generateTransactionID(req.body.rp_tdn, req.body.rp_pin);
    const transType = '2';
    const statusType = 'Pending';
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const query4 = "INSERT INTO rptax_clearance (`rp_tdn`, `rp_pin`, `transaction_id`) VALUES (?, ?, ?)";
    const values4 = [plainRptdn, plainRppin, transID];

    const query5 = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`) VALUES (?, ?, ?, ?, ?)";
    const values5 = [transID, user_id, transType, statusType, formattedDate];


    try{
      const result4 = await queryDatabase(query4, values4);
      const result5 = await queryDatabase(query5, values5);

      res.json({
        message: "Successfully executed",
        rptax_clearance_result: result4,
        user_transaction_result: result5,

      });
    }catch (err){
      console.error(err);
      res.status(500).json({ error: "Error executing queries" });
    }


  });

  
  // router.post('/payment/:user_id', async (req, res) => {
  //   const user_id = req.params.user_id;
  //   const transID = generateTransactionID(req.body.rp_tdn, req.body.rp_pin);
  //   const transType = '1';
  //   const statusType = 'Pending';
  //   const date = new Date();
  //   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

  //   const query = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`) VALUES (?, ?, ?, ?, ?)";
  //   const values = [transID, user_id, transType, statusType, formattedDate];
  
  //   const query1 = "INSERT INTO rptax_payment (`acc_name`, `rp_tdn`, `rp_pin`, `year_id`, `period_id`, `transaction_id`) VALUES (?, ?, ?, ?, ?, ?)";
  //   const values1 = [req.body.acc_name, req.body.rp_tdn, req.body.rp_pin, req.body.rp_year, req.body.period, transID];
  
  //   const query2 = "INSERT INTO transaction_info (`amount`, `transaction_id`) VALUES (?, ?)";
  //   const values2 = [req.body.amount, transID];
  
  //   try {
  //   const result = await queryDatabase(query, values);
  //   const result1 = await queryDatabase(query1, values1);
  //   const result2 = await queryDatabase(query2, values2);
  
  
  //   res.json({
  //       message: "Successfully executed",
  //       user_transaction_result: result,
  //       rp_tax_result: result1,
  //       transaction_info_result: result2,
  
  //   });
  //   } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: "Error executing queries" });
  //   }
  // });
  
  
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

  export default router;