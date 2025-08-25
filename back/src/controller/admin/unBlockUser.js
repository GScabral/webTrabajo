const { User } = require('../../db');

const unBlockUserAdmin = async (userId) => {


    console.log("unasd:",userId)
    try {
        const user = await User.findByPk(userId);
        if (!user) return { error: 'Usuario no encontrado' };

        await user.update({
            bloqueado: false,
        });

        return { mensaje: 'Usuario desbloqueado con éxito' };
    } catch (error) {
        console.error('Error bloqueando usuario:', error);
        return { error: 'Error interno del servidor' };
    }
};

module.exports = unBlockUserAdmin;
