const { Router } = require("express");
const { 
    getNotifications, 
    markAsRead, 
    markAllAsRead 
} = require("../controller/notificationController");

const authenticate = require("../middleware/authenticate");

const router = Router();

// ✅ Obtener todas las notificaciones de un usuario
// GET /api/notifications/:userId
router.get("/:userId", authenticate, async (req, res) => {
    try {
        const notifs = await getNotifications(req, res);
        return notifs;
    } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// ✅ Marcar una notificación como leída
// PATCH /api/notifications/:notificationId/read
router.patch("/:notificationId/read", authenticate, async (req, res) => {
    try {
        const notif = await markAsRead(req, res);
        return notif;
    } catch (error) {
        console.error("Error al marcar notificación:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// ✅ Marcar todas como leídas
// PATCH /api/notifications/read-all
router.patch("/read-all", authenticate, async (req, res) => {
    try {
        const notif = await markAllAsRead(req, res);
        return notif;
    } catch (error) {
        console.error("Error al marcar todas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
