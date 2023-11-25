import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

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
          suffix_type,
          sex_type,
          cvl_status,
          res_status,
          czn_status,
          birth_date,
          birth_place
          } = req.body;
    
  
    // Update user_personal table
    conn2.query(
      'UPDATE user_personal SET `f_name`=?, `m_name`=?, `l_name`=?, `suffix_type`=?, `sex_type`=?, `cvl_status`=?, `res_status`=?, `czn_status`=? WHERE user_id=?',
      [f_name, m_name, l_name, suffix_type, sex_type, cvl_status, res_status, czn_status, user_id],
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

export default router;