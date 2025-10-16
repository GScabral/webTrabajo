const { Router } = require('express');
const obtenerCalificacionesLogic = require('../controller/trabajador/viewRatings');
const crearCalificacionLogic = require('../controller/cliente/qualyWorker');
const { newViews, allContacts, allStats, addContact } = require('../controller/trabajador/AllStats')
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
router.post("/views", newViews);
router.post("/addContact", addContact);
router.get("/contacts/:id", allContacts);
router.get("/stats", allStats);
module.exports = router;
