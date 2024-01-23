import { Router } from 'express';
import conn2 from './connection.js'
import bcrypt from 'bcrypt';

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

  router.put('/reset_pass/:mobile_no', async (req, res) => {
    const mobile_no = req.params.mobile_no;
    const { new_user_pass } = req.body;
  
      // Update the user's password in the database
      const hashedPassword = await bcrypt.hash(new_user_pass, 10);
      const updateSql = "UPDATE user_auth SET user_pass = ? WHERE mobile_no = ?";
      conn2.query(updateSql, [hashedPassword, mobile_no], (updateErr) => {
        if (updateErr) {
          console.error("Password Update Error:", updateErr);
          return res.status(500).json({ message: "Error occurred while updating the password." });
        }
  
        res.status(200).json({ message: "Password changed successfully!" });
      // });
    });
  });

export default router;