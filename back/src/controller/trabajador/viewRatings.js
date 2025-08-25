const { Calificacion, Cliente } = require('../../db')

async function obtenerCalificacionesLogic(trabajador_id) {
    const calificaciones = await Calificacion.findAll({
        where: { trabajador_id },

    });

    return calificaciones;
}


module.exports = obtenerCalificacionesLogic