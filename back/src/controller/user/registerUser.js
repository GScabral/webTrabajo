const { User, Trabajador, Servicio } = require('../../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async (userData) => {
    try {
        const {
            email,
            password,
            nombre,
            tipo,
            foto_perfil,
            ubicacion,
            telefono,
            // Datos específicos de Trabajador
            descripcion,
            tarifa_minima,
            tarifa_maxima,
            disponibilidad,
            servicioIds // array de IDs de servicios
        } = userData;

        if (!email || !password || !nombre || !tipo) {
            throw new Error('Faltan datos obligatorios');
        }

        // 1. Crear el usuario
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            email,
            password_hash: hashedPassword,
            nombre,
            tipo,
            foto_perfil,
            ubicacion,
            telefono
        });

        // 2. Si es trabajador, crear el perfil y asignar servicios
        if (tipo === 'trabajador') {
            const nuevoTrabajador = await Trabajador.create({
                id: newUser.id,
                descripcion,
                tarifa_minima,
                tarifa_maxima,
                disponibilidad
            });

            // 3. Asignar servicios si se pasan IDs
            if (servicioIds && Array.isArray(servicioIds)) {
                const servicios = await Servicio.findAll({ where: { id: servicioIds } });
                await nuevoTrabajador.addServicios(servicios);
            }
        }

        return newUser;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return { error: error.message };
    }
};

module.exports = registerUser;
