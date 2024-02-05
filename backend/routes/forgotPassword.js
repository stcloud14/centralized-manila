import { Router } from 'express';
import conn2 from './connection.js'
import bcrypt from 'bcrypt';

const router = Router();

  router.post('/forgot-pass/:mobile_no', (req, res) => {
    const mobile_no = req.params.mobile_no;
    console.log(mobile_no);

    const sql = "SELECT * FROM user_auth WHERE mobile_no = ?";

    const sql1 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)"

    conn2.query(sql, [mobile_no], async (err, results) => {
        if (err) {
            console.error("Authentication Error:", err);
            return res.status(500).json({ message: "Error occurred while authenticating." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Number Not Found. Please check." });
        }
        // Assuming you have a user_id in the results (change accordingly based on your database schema)
        const user_id = results[0].user_id;
        const notif_title = 'Successfully changed your password!';
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const notif_message = `</span> Congratulations! Your password has been successfully changed. </p>`;

        const value1 = [user_id, formattedDate, notif_title, notif_message];

        conn2.query(sql1, value1, (err1, results1) => {
            if (err1) {
                console.error("Notification Error:", err1);
                return res.status(500).json({ message: "Error occurred while inserting notification." });
            }
            res.status(200).json({
                results,
                results1,
                message: "Authentication successful! Notification sent."
            });
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