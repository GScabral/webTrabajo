const { Admin } = require('../../db');

const changeAdminRole = async (adminId, newRole) => {
    try {
        const admin = await Admin.findByPk(adminId);
        if (!admin) {
            throw new Error('Admin no encontrado');
        }

        // Solo permite roles válidos
        if (!['moderador', 'superadmin'].includes(newRole)) {
            throw new Error('Rol de admin no válido');
        }

        await admin.update({ rol: newRole });

        return { message: 'Rol de admin actualizado correctamente', admin };
    } catch (error) {
        console.error('Error al cambiar el rol del admin:', error);
        throw error;
    }
};

module.exports = changeAdminRole;