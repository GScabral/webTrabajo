const { Router } = require('express');
const crearMensaje = require("../controller/mensajes/sendMensaje")
const obtenerChatsRecientes = require("../controller/mensajes/cahtReciente")
const marcarConversacionComoLeida = require("../controller/mensajes/checkMensaje")
const obtenerConversacion = require("../controller/mensajes/getMensaje")

const router = Router();



router.post("/sendMensaje", async (req, res) => {
    console.log(req.body)
    try {
        const { emisor_id, receptor_id, contenido } = req.body;

        if (!emisor_id || !receptor_id || !contenido) {
            return res.status(400).json({ error: "Faltan datos obligatorios." });
        }

        const nuevoMensaje = await crearMensaje({ emisor_id, receptor_id, contenido });
        res.status(201).json(nuevoMensaje);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error interno del servidor." });
    }
});
router.get("/chatsRecientes/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const chats = await obtenerChatsRecientes({ userId: Number(userId) });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error interno del servidor." });
    }
});

router.patch("/marcarConversacionLeida", async (req, res) => {
    try {
        const { userId, chatWithId } = req.body;
        console.log("Datos recibidos en marcarConversacionLeida:", { userId, chatWithId }); // <-- Agrega este log
        const resultado = await marcarConversacionComoLeida({ userId, chatWithId });
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error interno del servidor." });
    }
});


router.get("/conversacion/:userId1/:userId2", async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        const mensajes = await obtenerConversacion({ userId1: Number(userId1), userId2: Number(userId2) });
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error interno del servidor." });
    }
});







module.exports = router;