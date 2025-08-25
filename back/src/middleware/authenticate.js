const jwt = require('jsonwebtoken');
const { ActiveToken } = require('../db');
const secretKey = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        // Verificar que esté en la lista de activos
        const active = await ActiveToken.findOne({ where: { token } });
        if (!active) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        // Verificar firma JWT
        req.user = jwt.verify(token, secretKey);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authenticate;
