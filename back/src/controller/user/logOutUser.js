require('dotenv').config();
const { ActiveToken } = require('../../db');

const logout = async (req, res) => {
    try {
        // Obtener token desde header Authorization o cookie
        const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

        if (token) {
            await ActiveToken.destroy({ where: { token } });
        }

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        return res.json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
};

module.exports = logout;
