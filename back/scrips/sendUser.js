const { User, Trabajador, Servicio } = require("../src/db");
const bcrypt = require("bcrypt");
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
            descripcion,
            tarifa_minima,
            tarifa_maxima,
            disponibilidad,
            servicioIds // array de IDs de servicios
        } = userData;

        if (!email || !password || !nombre || !tipo) {
            throw new Error('Faltan datos obligatorios');
        }

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

        if (tipo === 'trabajador') {
            const nuevoTrabajador = await Trabajador.create({
                id: newUser.id,
                descripcion,
                tarifa_minima,
                tarifa_maxima,
                disponibilidad
            });

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

const seedUsers = async () => {
    try {
        // Ejemplo de servicios existentes
        const servicios = await Servicio.findAll();
        const servicioIds = servicios.map(s => s.id);

        // Crear 10 usuarios clientes y 10 trabajadores
        for (let i = 1; i <= 70; i++) {
            await registerUser({
                email: `cliente${i}@mail.com`,
                password: "password123",
                nombre: `Cliente ${i}`,
                tipo: "cliente",
                foto_perfil: null,
                ubicacion: "Ciudad",
                telefono: "123456789"
            });
        }

        for (let i = 1; i <= 10; i++) {
            await registerUser({
                email: `trabajador${i}@mail.com`,
                password: "password123",
                nombre: `Trabajador ${i}`,
                tipo: "trabajador",
                foto_perfil: null,
                ubicacion: "Ciudad",
                telefono: "987654321",
                descripcion: `Soy trabajador número ${i}`,
                tarifa_minima: 100,
                tarifa_maxima: 500,
                disponibilidad: "Lunes a Viernes",
                servicioIds: servicioIds.slice(0, 2) // Asigna 2 servicios al azar
            });
        }

        console.log("✅ Usuarios de prueba creados con éxito.");
    } catch (error) {
        console.error("❌ Error al crear los usuarios:", error);
    }
};

// Ejecutar
seedUsers();



//node scrips/sendUser.js