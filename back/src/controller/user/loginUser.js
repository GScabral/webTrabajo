require('dotenv').config();
const { User, ActiveToken, Admin } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({
            where: { email },
            include: [{ model: Admin, attributes: ['rol'] }]
        });

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        const payload = {
            id: user.id,
            role: user.Admin ? user.Admin.rol : 'user'
        };

        const expiresIn = '12h';
        const token = jwt.sign(payload, secretKey, { expiresIn });

        // Guardar token activo en BD
        const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12h
        await ActiveToken.create({
            token,
            userId: user.id,
            expiresAt
        });

        // Guardar último login
        await user.update({ last_login: new Date() });

        return {
            token,
            idUser: user.id,
            role: payload.role // devolver rol al frontend
        };
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { error: error.message };
    }
};

module.exports = loginUser;
