const createServicio = require("../src/controller/servicio/newService");
const { conn } = require("../src/db");

const servicios = [
    { nombre: "Plomería", descripcion: "Reparaciones de cañerías y grifería", categoria: "Hogar" },
    { nombre: "Electricidad", descripcion: "Instalaciones y arreglos eléctricos", categoria: "Hogar" },
    { nombre: "Jardinería", descripcion: "Cuidado y mantenimiento de jardines", categoria: "Hogar" },
    { nombre: "Otros", descripcion: "Servicio personalizado", categoria: "Especial", otra_profesion: "Paseador de perros" },
    { nombre: "Carpintero", descripcion: "Trabajos en madera y muebles", categoria: "Hogar" },
    { nombre: "Pintor", descripcion: "Pintura de interiores y exteriores", categoria: "Hogar" },
    { nombre: "Gasista", descripcion: "Instalación y reparación de gas", categoria: "Hogar" },
    { nombre: "Albañil", descripcion: "Construcción y reformas", categoria: "Hogar" },
    { nombre: "Cerrajero", descripcion: "Apertura y cambio de cerraduras", categoria: "Hogar" },
    { nombre: "Técnico en computadoras", descripcion: "Reparación y mantenimiento de PCs", categoria: "Tecnología" },
    { nombre: "Mecánico", descripcion: "Reparación de autos y motos", categoria: "Automotor" },
    { nombre: "Mudanzas", descripcion: "Servicio de mudanzas y fletes", categoria: "Transporte" },
    { nombre: "Niñera", descripcion: "Cuidado de niños", categoria: "Familia" },
    { nombre: "Cuidado de personas mayores", descripcion: "Asistencia y acompañamiento", categoria: "Salud" }
];

const seedServices = async () => {
    try {
        await conn.sync(); // Asegura conexión y modelos

        for (const servicio of servicios) {
            const result = await createServicio(servicio);
            if (result.error) {
                console.error("❌ Error creando servicio:", result.message);
            } else {
                console.log("✅ Servicio creado:", result.nombre);
            }
        }
        process.exit(0);
    } catch (error) {
        console.error("❌ Error general:", error);
        process.exit(1);
    }
};

seedServices();

// node scrips/seedServices.js