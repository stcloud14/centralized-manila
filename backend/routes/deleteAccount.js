import { Router } from 'express';
import conn2 from './connection.js'

const router = Router();


  router.delete('/accdelete/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    // SQL query to delete user account
    const sql1 = "DELETE FROM user_auth WHERE user_id = ?";
    const sql2 = "DELETE FROM user_reg WHERE user_id = ?";
    const sql3 = "DELETE FROM user_personal WHERE user_id = ?";
    const sql4 = "DELETE FROM user_contact WHERE user_id = ?";
    const sql5 = "DELETE FROM user_gov_id WHERE user_id = ?";
    const sql6 = "DELETE FROM birth_info WHERE user_id = ?";
    const sql7 = "DELETE FROM address_info WHERE user_id = ?";
    

    try {
        // Pass user_id as a parameter to the queryDatabase function
        const result1 = await queryDatabase(sql1, [user_id]);
        const result2 = await queryDatabase(sql2, [user_id]);
        const result3 = await queryDatabase(sql3, [user_id]);
        const result4 = await queryDatabase(sql4, [user_id]);
        const result5 = await queryDatabase(sql5, [user_id]);
        const result6 = await queryDatabase(sql6, [user_id]);
        const result7 = await queryDatabase(sql7, [user_id]);
        res.json({
            message: "Successfully executed",
            user_auth_result: result1,
            user_reg_result: result2,
            user_personal_result: result3,
            user_contact_result: result4,
            user_gov_id_result: result5,
            birth_info_result: result6,
            address_info_result: result7,
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