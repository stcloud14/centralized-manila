import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

router.get("/:username/:password", (req, res) => {
    const username = req.params.username
    const password = req.params.password
    console.log(username, password)
  
    // SQL query to check user credentials
    const sql = "SELECT * FROM user_auth WHERE mobile_no = ? AND user_pass = ?";
  
    conn2.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
      }
      return res.status(200).json(results)
    });
  });

  export default router;