import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

// //Profile Information
// app.get("/profile", (req, res)=>{
//   const q= "SELECT * FROM user_personal WHERE user_id = 'RL1741'"
//   conn2.query(q,(err, data)=>{
//           if(err) return res.json(err)
//           return res.json(data)
//   })
// })

router.get('/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  // SQL query to fetch the user's profile data and contact data
  const sql = "SELECT * FROM user_personal WHERE user_id = ?";
  const sql1 = "SELECT * FROM birth_info WHERE user_id = ?";

  conn2.query(sql, [user_id], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error retrieving data');
      } else {
          const userPersonalData = result;

          // Execute the second query to get contact data
          conn2.query(sql1, [user_id], (err1, result1) => {
              if (err1) {
                  console.error(err1);
                  res.status(500).send('Error retrieving contact data');
              } else {
                  const userBirthData = result1;

                  const userData = {
                      user_personal: userPersonalData,
                      birth_info: userBirthData
                  };

                  res.json(userData);
              }
          });
      }
  });
});


router.get('/contact/:user_id', (req, res) => {
      const user_id = req.params.user_id;
      
      const sql = "SELECT uc.user_id, uc.user_email, uc.mobile_no, uc.tel_no, mc.city_name, mb.brgy_name, md.dist_name, ai.addr_complete_info \
      FROM user_contact uc JOIN metromanila_cities mc ON uc.city_id = mc.city_id \
      JOIN manila_brgy mb ON uc.brgy_id = mb.brgy_id \
      JOIN manila_district md ON uc.dist_id = md.dist_id \
      JOIN address_info ai ON uc.addr_info_id = ai.addr_info_id \
      WHERE uc.user_id = ?";
      
      conn2.query(sql, [user_id], (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send('Error retrieving contact info');
          } else {
              res.json(result);
              console.log(result)
          }
      });
  });

// Government ID
  router.get('/govinfo/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = "SELECT * FROM user_gov_id WHERE user_id = ?";
    conn2.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving government info');
        } else {
            res.json(result);
        }
    });
  });

  // router.get('/rptaxpayment/:user_id', (req, res) => {
  //   const user_id = req.params.user_id;
  //   const sql = "SELECT * FROM rp_tax WHERE user_id = ?";
  //   conn2.query(sql, [user_id], (err, result) => {
  //       if (err) {
  //           console.error(err);
  //           res.status(500).send('Error retrieving government info');
  //       } else {
  //           res.json(result);
  //       }
  //   });
  // });


  router.put('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
  
    const {
          f_name,
          m_name,
          l_name,
          suffix_id,
          sex_id,
          cvl_id,
          res_id,
          czn_id,
          birth_date,
          birth_place
          } = req.body;
    
  
    // Update user_personal table
    conn2.query(
      'UPDATE user_personal SET `f_name`=?, `m_name`=?, `l_name`=?, `suffix_id`=?, `sex_id`=?, `cvl_id`=?, `res_id`=?, `czn_id`=? WHERE user_id=?',
      [f_name, m_name, l_name, suffix_id, sex_id, cvl_id, res_id, czn_id, user_id],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Update birth_info table
          conn2.query(
            'UPDATE birth_info SET `birth_date`=?, `birth_place`=? WHERE user_id=?',
            [birth_date, birth_place, user_id],
            (errorBirth, resultsBirth, fieldsBirth) => {
              if (errorBirth) {
                console.error(errorBirth);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                res.status(200).json({ message: 'Update successful' });
              }
            }
          );
        }
      }
    );
  });

      router.put('/contact/:user_id', (req, res) => {
        const user_id = req.params.user_id;
      
        const {
          user_email,
          mobile_no,
          tel_no,
          user_municipal,
          user_brgy,
          user_dist,
          user_addr,
        } = req.body;
        console.log(req.body);
        // Assuming you want to update the 'user_personal' table
        conn2.query(
          'UPDATE user_contact SET `user_email`=?, `mobile_no`=?, `tel_no`=?, `user_municipal`=?, `user_brgy`=?, `user_dist`=?, `user_addr`=?  WHERE user_id=?',
          [user_email, mobile_no, tel_no, user_municipal, user_brgy, user_dist, user_addr, user_id],
          (error, results, fields) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.status(200).json({ message: 'Update successful' });
            }
          }
        );
      });

      router.put('/govinfo/:user_id', (req, res) => {
        const user_id = req.params.user_id;
      
        const {
          user_tin_id,
          user_pgb_id,
          user_philh_id,
          user_sss_id,
          user_gsis_id,
          user_natl_id,
        } = req.body;
        console.log(req.body);
        // Assuming you want to update the 'user_personal' table
        conn2.query(
          'UPDATE user_gov_id SET `user_tin_id`=?, `user_pgb_id`=?, `user_philh_id`=?, `user_sss_id`=?, `user_gsis_id`=?, `user_natl_id`=?  WHERE user_id=?',
          [user_tin_id, user_pgb_id, user_philh_id, user_sss_id, user_gsis_id, user_natl_id, user_id],
          (error, results, fields) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.status(200).json({ message: 'Update successful' });
            }
          }
        );
      });


      // router.put('/rptaxpayment/:user_id', (req, res) => {
      //   const user_id = req.params.user_id;
      //   const {
      //     rp_tdn,
      //     rp_pin,
      //     rp_year,
      //     rp_period,
      //   } = req.body;
      //   console.log(req.body);
      //   conn2.query(
      //     'UPDATE rp_tax SET `rp_tdn`=?, `rp_pin`=?, `rp_year`=?, `rp_period`=? WHERE user_id=?',
      //     [rp_tdn, rp_pin, rp_year, rp_period, user_id],
      //     (error, results, fields) => {
      //       if (error) {
      //         console.error(error);
      //         res.status(500).json({ error: 'Internal Server Error' });
      //       } else {
      //         res.status(200).json({ message: 'Update successful' });
      //       }
      //     }
      //   );
      // });



// // Contact Info
// router.get('/contact/:user_id', (req, res) => {
//     const user_id = req.params.user_id;
    
//     const sql = "SELECT * FROM user_contact WHERE user_id = ?";
    
//     conn2.query(sql, [user_id], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error retrieving contact info');
//         } else {
//             res.json(result);
//         }
//     });
// });





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

router.get('/rptaxpayment/', async (req, res) => {
  const query = "SELECT * FROM rp_tax";
  const query1 = "SELECT * FROM transaction_info";

  try {
  const result = await queryDatabase(query);
  const result1 = await queryDatabase(query1);

  
  res.json({ user_reg: result, user_auth: result1 });
  } catch (err) {
  console.error(err);
  res.status(500).send('Error retrieving data');
  }
});


router.post('/rptaxpayment/', async (req, res) => {
  const primaryKey = generatePrimaryKey(req.body.rp_tdn, req.body.rp_pin);

  const query = "INSERT INTO rp_tax (`acc_name`, `rp_tdn`, `rp_pin`, `year`, `period_id`, `transaction_id`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [req.body.acc_name, req.body.rp_tdn, req.body.rp_pin, req.body.rp_year, req.body.period, primaryKey];

  const query1 = "INSERT INTO transaction_info (`amount`, `transaction_id`) VALUES (?, ?)";
  const values1 = [req.body.amount, primaryKey];

  try {
  const result = await queryDatabase(query, values);
  const result1 = await queryDatabase(query1, values1);


  res.json({
      message: "Successfully executed",
      rp_tax_result: result,
      transaction_info_result: result1,

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

function generatePrimaryKey(rp_tdn, rp_pin) {

  // Extract the last 4 digits of the mobile number
  const last4DigitsTdn = rp_tdn.slice(-4);

  const last4DigitsPin = rp_pin.slice(-4);

  // Concatenate the components to create the primary key
  const primaryKey = `${last4DigitsTdn}${last4DigitsPin}`;

  console.log(primaryKey)
  return primaryKey;
}

export default router;