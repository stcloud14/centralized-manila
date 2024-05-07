import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/generate-token', (req, res) => {
    try {
        const { user_id } = req.body;
        const token = jwt.sign({ user_id }, process.env.JWTTOKEN, { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

function verifyToken(req, res, next) {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    if (!token) {
        // If no token is provided, return a 401 Unauthorized response
        return res.status(401).json({ message: "No token provided." });
    }

    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWTTOKEN);

        // Attach the decoded payload to the request object for further processing
        req.decoded = decoded;
        next();

    } catch (error) {
        // If token verification fails, return a 403 Forbidden response
        res.status(403).json({ message: "Failed to authenticate token." });
    }
}

router.get('/protect-token/:user_id', verifyToken, (req, res) => {
    // Access the user ID from the request parameters
    const userId = req.params.user_id;
    // Access the user ID from the decoded token
    const tokenUserId = req.decoded.user_id;

    // Check if the user ID in the token matches the requested user ID
    if (userId !== tokenUserId) {
        return res.status(403).json({ message: "Unauthorized access." });
    }

    // If user has access, return a success message
    res.status(200).json({ message: `Authenticated user with user ID ${userId}.` });
});

// Example usage of the verifyToken middleware
router.get('/protected-route', verifyToken, (req, res) => {
    // Access the decoded payload attached to the request object
    const user_id = req.decoded.user_id;
    // Use the decoded payload for further processing
    res.status(200).json({ message: `Authenticated user with mobile number ${user_id}.`, user_id: req.decoded.user_id });
});

export default router;
