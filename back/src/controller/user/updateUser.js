const { User, Trabajador, Servicio } = require('../../db');

const updateUser = async (userId, updatedData) => {
    try {
        const {
            nombre,
            email,
            ubicacion,
            telefono,
            foto_perfil,
            descripcion,
            tarifa_minima,
            tarifa_maxima,
            disponibilidad,
            servicioIds // Opcional para trabajador
        } = updatedData;

        const user = await User.findByPk(userId);
        if (!user) throw new Error('Usuario no encontrado');

        // 1. Actualizar datos del usuario
        await user.update({
            nombre: nombre ?? user.nombre,
            email: email ?? user.email,
            ubicacion: ubicacion ?? user.ubicacion,
            telefono: telefono ?? user.telefono,
            foto_perfil: foto_perfil ?? user.foto_perfil
        });

        // 2. Si es trabajador, actualizar info adicional
        if (user.tipo === 'trabajador') {
            const trabajador = await Trabajador.findByPk(userId, {
                include: [Servicio]
            });

            if (!trabajador) throw new Error('Perfil de trabajador no encontrado');

            await trabajador.update({
                descripcion: descripcion ?? trabajador.descripcion,
                tarifa_minima: tarifa_minima ?? trabajador.tarifa_minima,
                tarifa_maxima: tarifa_maxima ?? trabajador.tarifa_maxima,
                disponibilidad: disponibilidad ?? trabajador.disponibilidad
            });

            // Actualizar servicios si se pasan
            if (servicioIds && Array.isArray(servicioIds)) {
                const servicios = await Servicio.findAll({ where: { id: servicioIds } });
                await trabajador.setServicios(servicios); // ⚠️ esto reemplaza los anteriores
            }
        }

        return { message: 'Usuario actualizado correctamente' };
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return { error: error.message };
    }
};

module.exports = updateUser;
