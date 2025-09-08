const notificationService = require("./notificacionesServi")

async function getNotifications(req, res) {
    const { userId } = req.params;
    try {
        const notifications = await notificationService.getNotificationsByUser(userId);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener notificaciones" });
    }
}

async function markAsRead(req, res) {
    const { notificationId } = req.params;
    const userId = req.user.id; // desde el middleware
    try {
        const notif = await notificationService.markAsRead(notificationId, userId);
        if (!notif) return res.status(404).json({ error: "Notificación no encontrada" });
        res.json(notif);
    } catch (err) {
        res.status(500).json({ error: "Error al marcar como leída" });
    }
}

async function markAllAsRead(req, res) {
    const userId = req.user.id;
    try {
        await notificationService.markAllAsRead(userId);
        res.json({ message: "Todas las notificaciones marcadas como leídas" });
    } catch (err) {
        res.status(500).json({ error: "Error al marcar todas como leídas" });
    }
}

module.exports = { getNotifications, markAsRead, markAllAsRead };
