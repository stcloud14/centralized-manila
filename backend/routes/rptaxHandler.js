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

  
  router.post('/payment/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const amount = req.body.amount;
    // const plainAmount = amount.replace(/,/g, '');
    const transID = generateTransactionID(req.body.rp_tdn, req.body.rp_pin);
    const transType = '1';
    const trans_type = 'Real Property Tax Payment';
    const notif_title = 'Transaction Payment Processing';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for < className="font-medium dark:text-white">${trans_type}: ${transID}</span> is currently being processed.</span></p>`;
    const statusType = 'Processing';
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    const expiryDate = new Date();
    expiryDate.setDate(date.getDate() + 5);
    const formattedExpiryDate = `${expiryDate.getFullYear()}-${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}-${expiryDate.getDate().toString().padStart(2, '0')} ${expiryDate.getHours().toString().padStart(2, '0')}:${expiryDate.getMinutes().toString().padStart(2, '0')}:${expiryDate.getSeconds().toString().padStart(2, '0')}`;

    const query = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`, `expiry_date`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [transID, user_id, transType, statusType, formattedDate, formattedExpiryDate];
  
    const query1 = "INSERT INTO rptax_payment (`transaction_id`, `acc_name`, `rp_tdn`, `rp_pin`, `year_id`, `period_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values1 = [transID, req.body.acc_name, req.body.rp_tdn, req.body.rp_pin, req.body.rp_year, req.body.period];
  
    const query2 = "INSERT INTO transaction_info (`transaction_id`, `amount`) VALUES (?, ?)";
    const values2 = [transID, amount !== undefined ? amount : 0];    

    const query3 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values3 = [user_id, formattedDate, notif_title, notif_message];
  
    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);
    const result3 = await queryDatabase(query3, values3);
  
  
    res.json({
        message: "Successfully executed",
        user_transaction_result: result,
        rptax_payment_result: result1,
        transaction_info_result: result2,
        notif_result: result3,
  
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
    }
  });


  router.get('/clearance/:user_id', async (req, res) => {

    const query4 = "SELECT * FROM rptax_clearance";
    const query5 = "SELECT * FROM user_transaction";
    const query6 = "SELECT * FROM transaction_info";
  
    try {
    const result4 = await queryDatabase(query4);
    const result5 = await queryDatabase(query5);
    const result6 = await queryDatabase(query6);
    

    res.json({rptax_clearance: result4, user_transaction: result5, transaction_info: result6 });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });
  
  
  router.post('/clearance/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const transID = generateTransactionID(req.body.rp_tdn, req.body.rp_pin);
    const transType = '2';
    const plainAmount = req.body.amount;
    const trans_type = 'Real Property Tax Clerance';
    const notif_title = 'Transaction Payment Processing';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transID}</span> is currently being processed.</span></p>`;
    const statusType = 'Processing';
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    const expiryDate = new Date();
    expiryDate.setDate(date.getDate() + 5);
    const formattedExpiryDate = `${expiryDate.getFullYear()}-${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}-${expiryDate.getDate().toString().padStart(2, '0')} ${expiryDate.getHours().toString().padStart(2, '0')}:${expiryDate.getMinutes().toString().padStart(2, '0')}:${expiryDate.getSeconds().toString().padStart(2, '0')}`;

    const query5 = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`, `expiry_date`) VALUES (?, ?, ?, ?, ?, ?)";
    const values5 = [transID, user_id, transType, statusType, formattedDate, formattedExpiryDate];
  
    const query6 = "INSERT INTO transaction_info (`transaction_id`, `amount`) VALUES (?, ?)";
    const values6 = [transID, plainAmount];  
    
    const query4 = "INSERT INTO rptax_clearance (`rp_tdn`, `rp_pin`, `transaction_id`) VALUES (?, ?, ?)";
    const values4 = [req.body.rp_tdn, req.body.rp_pin, transID];

    const query3 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values3 = [user_id, formattedDate, notif_title, notif_message];
  
    try {
      const result5 = await queryDatabase(query5, values5);
      const result6 = await queryDatabase(query6, values6);
      const result4 = await queryDatabase(query4, values4);
      const result3 = await queryDatabase(query3, values3);
  
      res.json({
        message: "Successfully executed",
        user_transaction_result: result5,
        transaction_info_result: result6,
        rptax_clearance_result: result4,
        notif_result: result3,
      });
    } catch (err) {
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