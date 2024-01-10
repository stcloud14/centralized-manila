import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

router.post("/:admin_id/:admin_pass", (req, res) => {
    const { admin_id, admin_pass } = req.params;
  
    // SQL query to check admin credentials
    const sql = "SELECT * FROM chief_admin WHERE admin_id = ? AND admin_pass = ?";
  
    conn2.query(sql, [admin_id, admin_pass], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
      }
  
      if (results.length > 0) {
        // Authentication successful
        return res.status(200).json({ message: 'Login successful', user: results[0] });
      } else {
        // Authentication failed
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
  

export default router;
