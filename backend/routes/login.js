import { Router } from 'express';
import conn2 from './connection.js'
// import conn1 from './connection1.js'
import bcrypt from 'bcrypt';

const router = Router();

router.post('/compare-password/:mobile_no/:user_pass', async (req, res) => {
  try {
    const mobile_no = req.params.mobile_no;
    const userEnteredPassword = req.params.user_pass;

    console.log(userEnteredPassword)

    let hashedUserPass = '';

    const sql = "SELECT * FROM user_auth WHERE mobile_no = ?";
    conn2.query(sql, [mobile_no], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
      }

      if (results.length > 0) {
        hashedUserPass = results[0].user_pass;

        try {
          const passwordMatch = await bcrypt.compare(userEnteredPassword, hashedUserPass);

          if (passwordMatch) {
            console.log("Results:", results);

            return res.status(200).json(results);
          } else {
            return res.status(401).json({ message: "Authentication failed" });
          }
        } catch (bcryptError) {
          console.error(bcryptError);
          return res.status(500).json({ message: "Error comparing passwords." });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

  router.post("/admin", (req, res) => {
    const { admin_name, admin_pass } = req.body;
  
    const authSql = "SELECT * FROM admin_auth WHERE mobile_no = ? AND password = ?";
  
    // Authenticate Admin
    conn1.query(authSql, [admin_name, admin_pass], (err, authResults) => {
      if (err) {
        console.error("Authentication Error:", err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
      }
  
      if (authResults.length === 0) {
        return res.status(401).json({ message: "Authentication failed. Please check your credentials." });
      }
  
      const admin_type = authResults[0].admin_type;
  
      // Return the authenticated admin and role (directly using admin_type as role)
      return res.status(200).json({
        admin: {
          admin_type,
          role: admin_type, // Using admin_type as the role
        },
        message: "Login successful",
      });
    });
  });
  export default router;