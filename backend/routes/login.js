import { Router } from 'express';
import conn2 from './connection.js';
import conn1 from './connection1.js';
import bcrypt from 'bcrypt';

const router = Router();

async function queryDatabase(connection, query, values) {
    try {
        const [rows] = await connection.query(query, values);
        return rows;
    } catch (err) {
        throw err;
    }
}

// Route to fetch the current password for a specific admin
// router.post('/admin/change-password/:mobile_no', async (req, res) => {
//     const { mobile_no } = req.params;
//     const { new_password } = req.body;

//     try {
//         // Update the password in the database based on the mobile number
//         const updateSql = "UPDATE admin_auth SET password = ? WHERE mobile_no = ?";
//         // Using queryDatabase1 function with connection1
//         await queryDatabase1(conn1, updateSql, [new_password, mobile_no]);

//         console.log('Password updated successfully');

//         return res.status(200).json({ message: 'Password updated successfully' });
//     } catch (err) {
//         console.error("Error updating password:", err);
//         return res.status(500).json({ message: "Error occurred while updating password" });
//     }
// });

// Route to update the admin's password
// router.post('/admin/change-password', async (req, res) => {
//     const { mobile_no, new_password } = req.body;

//     try {
//         // Hash the new password
//         const saltRounds = 10;
//         const hashedNewPassword = await bcrypt.hash(new_password, saltRounds);

//         // Update the password in the database
//         const updatePasswordSql = "UPDATE admin_auth SET password = ? WHERE mobile_no = ?";
//         await queryDatabase(updatePasswordSql, [hashedNewPassword, mobile_no]);

//         return res.status(200).json({ message: "Password updated successfully" });
//     } catch (err) {
//         console.error("Error updating password:", err);
//         return res.status(500).json({ message: "Error occurred while updating password" });
//     }
// });

// async function queryDatabase1(connection1, query, values) {
//     try {
//         const [rows] = await connection1.query(query, values);
//         return rows;
//     } catch (err) {
//         throw err;
//     }
// }

router.post('/compare-password/:mobile_no/:user_pass', async (req, res) => {
    try {
        const mobile_no = req.params.mobile_no;
        const userEnteredPassword = req.params.user_pass;
        console.log(userEnteredPassword);
        const sql = "SELECT * FROM user_auth WHERE mobile_no = ?";
        try {
            const results = await queryDatabase(conn2, sql, [mobile_no]);
            if (results.length > 0) {
                const hashedUserPass = results[0].user_pass;
                const passwordMatch = await bcrypt.compare(userEnteredPassword, hashedUserPass);
                if (passwordMatch) {
                    console.log("Results:", results);
                    return res.status(200).json(results);
                } else {
                    return res.status(401).json({ message: "Authentication failed" });
                }
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error occurred while authenticating." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// router.post("/admin", async (req, res) => {
//     const { admin_name, admin_pass } = req.body;

//     const authSql = "SELECT au.admin_type, ap.admin_name FROM admin_auth au LEFT JOIN admin_profile ap ON au.mobile_no = ap.mobile_no AND ap.mobile_no IS NOT NULL WHERE au.mobile_no = ? AND au.password = ?";
//     try {
//         const authResults = await queryDatabase(conn1, authSql, [admin_name, admin_pass]);
//         if (authResults.length === 0) {
//             return res.status(401).json({ message: "Authentication failed. Please check your credentials." });
//         }

//         const admin_type = authResults[0].admin_type;
//         const admin_uname = authResults[0].admin_name;

//         return res.status(200).json({
//             admin: {
//                 admin_type,
//                 admin_uname,
//                 role: admin_type,
//             },
//             message: "Login successful",
//         });
//     } catch (err) {
//         console.error("Authentication Error:", err);
//         return res.status(500).json({ message: "Error occurred while authenticating." });
//     }
// });

router.post("/admin", async (req, res) => {
    const { admin_name, admin_pass } = req.body;

    const authSql = "SELECT au.admin_type, ap.admin_name, au.password FROM admin_auth au LEFT JOIN admin_profile ap ON au.mobile_no = ap.mobile_no AND ap.mobile_no IS NOT NULL WHERE au.mobile_no = ?";
    try {
        const authResults = await queryDatabase(conn1, authSql, [admin_name]);
        if (authResults.length === 0) {
            return res.status(401).json({ message: "Authentication failed. Please check your credentials." });
        }

        const admin_type = authResults[0].admin_type;
        const admin_uname = authResults[0].admin_name;
        const hashedPassword = authResults[0].password;

        const match = await bcrypt.compare(admin_pass, hashedPassword);
        if (!match) {
            return res.status(401).json({ message: "Authentication failed. Please check your credentials." });
        }

        return res.status(200).json({
            admin: {
                admin_type,
                admin_uname,
                role: admin_type,
            },
            message: "Login successful",
        });
    } catch (err) {
        console.error("Authentication Error:", err);
        return res.status(500).json({ message: "Error occurred while authenticating." });
    }
});


// router.post("/admin", async (req, res) => {
//     const { admin_name, admin_pass } = req.body;

//     const authSql = "SELECT * FROM admin_auth WHERE mobile_no = ?";
//     try {
//         const authResults = await queryDatabase(conn1, authSql, [admin_name]);
//         if (authResults.length === 0) {
//             return res.status(401).json({ message: "Authentication failed. Please check your credentials." });
//         }

//         const hashedPassword = authResults[0].password;
//         const admin_type = authResults[0].admin_type;

//         const match = await bcrypt.compare(admin_pass, hashedPassword);
//         if (!match) {
//             return res.status(401).json({ message: "Authentication failed. Please check your credentials." });
//         }

//         return res.status(200).json({
//             admin: {
//                 admin_type,
//                 role: admin_type, // Using admin_type as the role
//             },
//             message: "Login successful",
//         });
//     } catch (err) {
//         console.error("Authentication Error:", err);
//         return res.status(500).json({ message: "Error occurred while authenticating." });
//     }
// });

// router.post("/admin/add", async (req, res) => {
//     const { mobile_no, password, adminType } = req.body;
//     const saltRounds = 10;

//     try {
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         const insertSql = "INSERT INTO admin_auth (mobile_no, password, admin_type) VALUES (?, ?, ?)";
//         const values = [mobile_no, hashedPassword, adminType];
        
//         await queryDatabase(conn1, insertSql, values);

//         return res.status(201).json({ message: "Admin added successfully" });
//     } catch (err) {
//         console.error("Error adding admin:", err);
//         return res.status(500).json({ message: "Error occurred while adding admin" });
//     }
// });


router.post("/admin/add", async (req, res) => {
    const { mobile_no, password, adminType, admin_name } = req.body;
    const saltRounds = 10;
    try {  
        // Check if admin already exists
        const existingAdminQuery = "SELECT * FROM admin_auth WHERE mobile_no = ?";
        const existingAdmin = await queryDatabase(conn1, existingAdminQuery, [mobile_no]);

        if (existingAdmin.length > 0) {
            console.log("Admin account already exists");
            return res.status(400).json({ message: "Admin account already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertSql = "INSERT INTO admin_auth (mobile_no, password, admin_type, admin_name) VALUES (?, ?, ?, ?)";
        await queryDatabase(conn1, insertSql, [mobile_no, hashedPassword, adminType, admin_name]);
        
        return res.status(201).json({ message: "Admin added successfully" });
    } catch (err) {
        console.error("Error adding admin:", err);
        return res.status(500).json({ message: "Error occurred while adding admin" });
    }
});




export default router;
