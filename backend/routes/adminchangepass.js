import { Router } from 'express';
import conn1 from './connection1.js';

const router = Router();

async function queryDatabase1(connection1, query, values) {
    try {
        const [rows] = await connection1.query(query, values);
        return rows;
    } catch (err) {
        throw err;
    }
}

router.post('/admin/change-password/:mobile_no', async (req, res) => {
    const { mobile_no } = req.params;
    const { new_password } = req.body;

    try {
        // Update the password in the database based on the mobile number
        const updateSql = "UPDATE admin_auth SET password = ? WHERE mobile_no = ?";
        // Using queryDatabase1 function with connection1
        await queryDatabase1(conn1, updateSql, [new_password, mobile_no]);

        console.log('Password updated successfully');

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error("Error updating password:", err);
        return res.status(500).json({ message: "Error occurred while updating password" });
    }
});

export default router;