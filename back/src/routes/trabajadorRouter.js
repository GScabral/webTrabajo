const { Router } = require('express');
const obtenerCalificacionesLogic = require('../controller/trabajador/viewRatings');
const crearCalificacionLogic = require('../controller/cliente/qualyWorker');
const { registrarVistaLogic,
    registrarContactoLogic,
    obtenerContactosLogic,
    obtenerEstadisticasLogic, } = require('../controller/trabajador/AllStats')
const router = Router();

// Ruta para crear una calificación (cliente → trabajador)
router.post('/calificaciones', async (req, res) => {
    try {
        console.log(req.body)
        const nuevaCalificacion = await crearCalificacionLogic(req.body);
        res.status(201).json(nuevaCalificacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la calificación' });
    }
});

// Ruta para obtener calificaciones de un trabajador
router.get('/calificaciones/:trabajador_id', async (req, res) => {
    try {
        const calificaciones = await obtenerCalificacionesLogic(req.params.trabajador_id);
        res.status(200).json(calificaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las calificaciones' });
    }
});

//falta modificar para que el controller solo maneje logica y no estados
router.post('/views', async (req, res) => {
    try {
        const result = await registrarVistaLogic(req.body);
        res.status(201).json({ message: 'Vista registrada correctamente', result });
    } catch (error) {
        console.error('Error en /views:', error);
        res.status(500).json({ error: 'Error al registrar vista' });
    }
});

// -------------------------------------------
// ➕ Registrar un contacto
// -------------------------------------------
router.post('/addContact', async (req, res) => {
    try {
        const nuevoContacto = await registrarContactoLogic(req.body);
        res.status(201).json(nuevoContacto);
    } catch (error) {
        console.error('Error en /addContact:', error);
        res.status(500).json({ error: 'Error al registrar contacto' });
    }
});

// -------------------------------------------
// 📞 Obtener contactos por perfil
// -------------------------------------------
router.get('/contacts/:id', async (req, res) => {
    try {
        const contactos = await obtenerContactosLogic(req.params.id);
        res.status(200).json(contactos);
    } catch (error) {
        console.error('Error en /contacts:', error);
        res.status(500).json({ error: 'Error al obtener contactos' });
    }
});

// -------------------------------------------
// 📊 Obtener estadísticas de un perfil
// -------------------------------------------
router.get('/stats/:id', async (req, res) => {
    try {
        const stats = await obtenerEstadisticasLogic(req.params.id);
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error en /stats:', error);
        res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
});

module.exports = router;
