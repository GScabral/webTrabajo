const { User } = require('../../db');

const blockUserAdmin = async (userId, bloqueado_hasta) => {


    try {
        const user = await User.findByPk(userId);
        if (!user) return { error: 'Usuario no encontrado' };

        await user.update({
            bloqueado: true,
            bloqueado_hasta: bloqueado_hasta || null
        });

        return { mensaje: 'Usuario bloqueado con éxito' };
    } catch (error) {
        console.error('Error bloqueando usuario:', error);
        return { error: 'Error interno del servidor' };
    }
};

module.exports = blockUserAdmin;
