import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

router.get('/admin-login', async (req, res) => {
const { admin_id, admin_pass } = req.query;
  console.log(admin_id)
  // SQL query to check user credentials
  const sql = "SELECT * FROM chief_admin WHERE admin_id = ? AND admin_pass = ?";

  try {
    const result = await queryDatabase(sql, [admin_id, admin_pass]);

    if (result.length > 0) {
      // Send a success message or any specific data you want
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    // Pass values as parameters to the query function
    conn2.query(query, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default router;
