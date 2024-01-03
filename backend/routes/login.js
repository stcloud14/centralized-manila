import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

router.get("/:mobile_no/:user_pass", (req, res) => {
    
    const mobile_no = req.params.mobile_no;
    const user_pass = req.params.user_pass;
  
    // SQL query to check user credentials
    const sql = "SELECT * FROM user_auth WHERE mobile_no = ? AND user_pass = ?";
  
    conn2.query(sql, [mobile_no, user_pass], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
      }
      return res.status(200).json(results)
    });
  });

  // Delete statement
  router.delete("/profile/accdelete/:user_id", (req, res) => {
    const user_id = req.params.user_id;
  
    // SQL query to delete user account
    const sql = "DELETE FROM user_auth WHERE user_id = ?";
  
    conn2.query(sql, [user_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred while deleting the account." });
      }
      // Check if any rows were affected
      if (results.affectedRows > 0) {
        return res.status(200).json({ message: "Account deleted successfully." });
      } else {
        return res.status(401).json({ message: "Invalid credentials. Account not deleted." });
      }
    });
  });
  
  export default router;