import { Router } from 'express';
import conn1 from './connection1.js';
import bcrypt from 'bcrypt';


const router = Router();

async function queryDatabase1(connection1, query, values) {
    try {
        const [rows] = await connection1.query(query, values);
        return rows;
    } catch (err) {
        throw err;
    }
}

router.post('/admin/change-credentials/:mobileNo', async (req, res) => {
    const { mobileNo } = req.params;
    const { mobile_no, admin_name, new_password } = req.body;

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(new_password, saltRounds);
    try {
        let updateSql = "UPDATE admin_auth SET ";
        let params = [];
        
        if (mobile_no !== null && mobile_no !== undefined) {
            updateSql += "mobile_no = ?, ";
            params.push(mobile_no);
        }
        if (admin_name !== null && admin_name !== undefined) {
            updateSql += "admin_name = ?, ";
            params.push(admin_name);
        }
        if (new_password !== null && new_password !== undefined) {
            updateSql += "password = ?, ";  
            params.push(hashedNewPassword); // Use hashed password
        }
        
        updateSql = updateSql.slice(0, -2);

        updateSql += " WHERE mobile_no = ?";

        params.push(mobileNo);

        await queryDatabase1(conn1, updateSql, params);

        return res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {

        console.error("Error updating password:", err);
        return res.status(500).json({ message: "Error occurred while updating password" });
    }
});


export default router;