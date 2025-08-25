const { User } = require('../../db');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


// Supongamos que el modelo User tiene un campo 'reset_token' y 'reset_token_expiration'
const resetPasswordUser = async (email, token, newPassword) => {

    console.log("cambio:", email)
    console.log("cambio:", token)
    console.log("cambio:", newPassword)
    try {
        // Busca el usuario por email y token válido
        const user = await User.findOne({
            where: {
                email,
                reset_token: token,
                reset_token_expiration: {
                    [Op.gt]: new Date()
                }
            }
        });

        if (!user) {
            throw new Error('Token inválido o expirado');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualiza la contraseña y elimina el token de recuperación
        await user.update({
            password_hash: hashedPassword,
            reset_token: null,
            reset_token_expiration: null
        });

        return { message: 'Contraseña restablecida correctamente' };
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        throw error;
    }
}

module.exports = resetPasswordUser;