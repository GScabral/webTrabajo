const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'clave-secreta'; // Usa una clave real en producción

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("🛡️ [authMiddleware] Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("❌ [authMiddleware] No token provided");
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("🔑 [authMiddleware] Extracted token:", token);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("✅ [authMiddleware] Token decoded:", decoded);

        // Ahora guardamos también el rol
        req.user = { 
            id: decoded.id, 
            role: decoded.role || 'user' 
        };

        next();
    } catch (error) {
        console.error("❌ [authMiddleware] Invalid token:", error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
