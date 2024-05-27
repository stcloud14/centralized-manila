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

router.post("/admin/add", async (req, res) => {
    const { mobile_no, password, adminType, admin_name } = req.body;
    const saltRounds = 10;
    try {  
        // Check if admin already exists
        const existingAdminQuery = "SELECT * FROM admin_auth WHERE mobile_no = ?";
        const existingAdmin = await queryDatabase1(conn1, existingAdminQuery, [mobile_no]);

        if (existingAdmin.length > 0) {
            console.log("Admin account already exists");
            return res.status(400).json({ message: "Admin account already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertSql = "INSERT INTO admin_auth (mobile_no, password, admin_type, admin_name) VALUES (?, ?, ?, ?)";
        await queryDatabase1(conn1, insertSql, [mobile_no, hashedPassword, adminType, admin_name]);

        const Sql1 = "INSERT INTO admin_profile (mobile_no, admin_name, admin_type ) VALUES (?, ?, ?)";
        await queryDatabase1(conn1, Sql1, [mobile_no, admin_name, adminType ]);

        
        return res.status(201).json({ message: "Admin added successfully" });
    } catch (err) {
        console.error("Error adding admin:", err);
        return res.status(500).json({ message: "Error occurred while adding admin" });
    }
});


export default router;