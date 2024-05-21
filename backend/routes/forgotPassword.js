import { Router } from 'express';
import conn2 from './connection.js';
import bcrypt from 'bcrypt';

const router = Router();

async function queryDatabase(query, values) {
    try {
        const connection = await conn2.getConnection();
        try {
            const [rows] = await connection.query(query, values);
            return rows;
        } finally {
            connection.release();
        }
    } catch (err) {
        throw err;
    }
}

router.post('/forgot-pass/:mobile_no', async (req, res) => {
    const mobile_no = req.params.mobile_no;
    console.log(mobile_no);

    const sql = "SELECT * FROM user_auth WHERE mobile_no = ?";
    const sql1 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";

    try {
        const results = await queryDatabase(sql, [mobile_no]);
        if (results.length === 0) {
            return res.status(404).json({ message: "Number Not Found. Please check." });
        }
        const user_id = results[0].user_id;
        const notif_title = 'Successfully changed your password!';
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const notif_message = `</span> Congratulations! Your password has been successfully changed. </p>`;

        const value1 = [user_id, formattedDate, notif_title, notif_message];

        await queryDatabase(sql1, value1);
        res.status(200).json({
            results,
            message: "Authentication successful! Notification sent."
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
    }
});

router.put('/reset_password/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const { new_user_pass } = req.body;
    const hashedPassword = await bcrypt.hash(new_user_pass, 10);
    const updateSql = "UPDATE user_auth SET user_pass = ? WHERE user_id = ?";

    try {
        await queryDatabase(updateSql, [hashedPassword, user_id]);
        res.status(200).json({ message: "Password changed successfully!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error occurred while updating the password." });
    }
});

router.put('/reset_pass/:mobile_no', async (req, res) => {
    const mobile_no = req.params.mobile_no;
    const { new_user_pass } = req.body;
    const hashedPassword = await bcrypt.hash(new_user_pass, 10);
    const updateSql = "UPDATE user_auth SET user_pass = ? WHERE mobile_no = ?";

    try {
        await queryDatabase(updateSql, [hashedPassword, mobile_no]);
        res.status(200).json({ message: "Password changed successfully!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error occurred while updating the password." });
    }
});

export default router;
