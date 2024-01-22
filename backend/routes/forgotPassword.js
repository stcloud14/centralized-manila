import { Router } from 'express';
import conn2 from './connection.js'


const router = Router();

router.post('/forgot-pass/:mobile_no', (req, res) => {
    const mobile_no = req.params.mobile_no;
    console.log(mobile_no)
  
    const sql = "SELECT * FROM user_auth WHERE mobile_no = ?";
    conn2.query(sql, [mobile_no], async (err, results) => {
      if (err) {
        console.error("Authentication Error:", err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Number Not Found. Please check." });
      }
      res.status(200).json({
        results,
        message: "Authentication successful!"
      });
    });
  });

  router.put('/reset-pass/:mobile_no', (req, res) => {
    const mobile_no = req.params.mobile_no;
    console.log(mobile_no)
  
    const sql = "SELECT * FROM user_auth WHERE mobile_no = ?";
    conn2.query(sql, [mobile_no], async (err, results) => {
      if (err) {
        console.error("Authentication Error:", err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Number Not Found. Please check." });
      }
      res.status(200).json({
        results,
        message: "Authentication successful!"
      });
    });
  });


export default router;