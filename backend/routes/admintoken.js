import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();


router.post('/generate-token-admin', (req, res) => {
    try {
        const { admin_type } = req.body;
        console.log(admin_type)
        if (!admin_type) {
            return res.status(400).json({ message: 'Admin type is required' });
        }

        const token = jwt.sign({ admin_type }, process.env.JWTTOKEN, { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

function verifyTokenForAdmin(req, res, next) {
    // console.log('Token received:', req.headers['authorization']);
    const token = req.headers['authorization'];


    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWTTOKEN);

        if (!decoded.admin_type) {
            return res.status(403).json({ message: "Invalid token for admin access." });
        }

        // Assign the decoded admin_type to a variable
        const adminType = decoded.admin_type;

        // Attach the decoded admin_type to req.decoded.admin_type
        req.decoded = {
            admin_type: adminType
        };

        // Continue to the next middleware
        next();
    } catch (error) {
        res.status(403).json({ message: "Failed to authenticate token." });
    }
}

router.get('/protect-token-admin/:admin_type', verifyTokenForAdmin, (req, res) => {
    const admin_type = req.params.admin_type;
    // console.log('Admin type from URL:', admin_type);

    const tokenAdmin = req.decoded.admin_type;
    // console.log('Admin type from token:', tokenAdmin);


    
    if (admin_type !== tokenAdmin) {
        return res.status(403).json({ message: "Unauthorized access." });
    }

    res.status(200).json({ 
        message: `Authenticated user with user ID ${admin_type}.`,
        admin_type: admin_type,
        tokenAdmin: tokenAdmin,  // Include the decoded admin_type in the response
    });
});

router.get('/protected-route/admin', verifyTokenForAdmin, (req, res) => {
    const admin_type = req.decoded.admin_type;
    res.status(200).json({ message: `Authenticated admin with admin type ${admin_type}.`, admin_type: req.decoded.admin_type });
});

export default router;
