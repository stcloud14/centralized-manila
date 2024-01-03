import { Router } from 'express';
import conn2 from './connection.js'

const router = Router();


  router.delete('/accdelete/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    // SQL query to delete user account
    const sql1 = "DELETE FROM user_auth WHERE user_id = ?";

    try {
        // Pass user_id as a parameter to the queryDatabase function
        const result = await queryDatabase(sql1, [user_id]);
        res.json({
            message: "Successfully executed",
            user_auth_result: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
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
  
  //   conn2.query(sql1, [user_id], (err, results) => {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).json({ message: "Error occurred while deleting the account." });
  //     }
  //     // Check if any rows were affected
  //     if (results.affectedRows > 0) {
  //       return res.status(200).json({ message: "Account deleted successfully." });
  //     } else {
  //       return res.status(401).json({ message: "Invalid credentials. Account not deleted." });
  //     }
  //   });
  // });
  
  export default router;