import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

router.post("/:admin_name/:admin_pass", (req, res) => {
  const { admin_name, admin_pass } = req.params;

  // SQL query to check admin credentials and retrieve role
  const sql = "SELECT role FROM admin WHERE admin_name = ? AND admin_pass = ?";

  conn2.query(sql, [admin_name, admin_pass], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error occurred while authenticating." });
    }

    if (results.length > 0) {
      const admin = results[0];
      const adminRole = admin.role;

      // Authentication successful, return admin details and role
      return res.status(200).json({ message: 'Login successful', admin: { admin_name: admin.admin_name, role: adminRole } });
    } else {
      // Authentication failed
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

export default router;
