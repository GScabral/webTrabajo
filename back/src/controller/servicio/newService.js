const { Servicio } = require('../../db');

const createServicio = async (data) => {
    const { nombre, descripcion, categoria, otra_profesion } = data;

    try {
        const nombreFinal = nombre === 'Otros' && otra_profesion ? otra_profesion : nombre;

        const nuevoServicio = await Servicio.create({
            nombre: nombreFinal,
            descripcion,
            categoria
        });

        return nuevoServicio;
    } catch (error) {
        return { error: true, message: error.message || 'Error al crear el servicio' };
    }
};

module.exports = createServicio;
