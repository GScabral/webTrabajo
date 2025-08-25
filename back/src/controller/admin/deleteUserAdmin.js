const { User } = require('../../db');

const deleteUserAdmin = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await user.destroy();
        return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar usuario por admin:', error);
        throw error;
    }
};

module.exports = deleteUserAdmin;