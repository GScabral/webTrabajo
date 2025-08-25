const { Calificacion, Trabajador } = require('../../db');

async function crearCalificacionLogic(data) {
    const { puntuacion, comentario, cliente_id, trabajador_id } = data;

    const nuevaCalificacion = await Calificacion.create({
        puntuacion,
        comentario,
        trabajador_id,
    });

    const calificaciones = await Calificacion.findAll({
        where: { trabajador_id },
        attributes: ['puntuacion']
    });

    const suma = calificaciones.reduce((acc, c) => acc + c.puntuacion, 0);
    const promedio = suma / calificaciones.length;

    await Trabajador.update({
        promedio_valoracion: promedio,
        numero_valoraciones: calificaciones.length
    }, {
        where: { id: trabajador_id }
    });

    return nuevaCalificacion;
}


module.exports = crearCalificacionLogic;