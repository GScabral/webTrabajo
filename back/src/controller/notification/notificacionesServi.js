// services/notificationService.js
const { Notification, User, Post } = require("../../db");

// ✅ Crear una notificación genérica
async function createNotification({ recipientId, actorId, postId, commentId, type, meta = {} }) {
    if (recipientId === actorId) return null; // no notificarte a ti mismo

    return await Notification.create({
        recipient_id: recipientId,
        actor_id: actorId,
        post_id: postId || null,
        comment_id: commentId || null,
        type,
        meta,
    });
}

// ✅ Notificar menciones
async function notifyMentions({ mentionedUserIds, actorId, postId, commentId, contenido }) {
    const promises = mentionedUserIds.map(uid =>
        createNotification({
            recipientId: uid,
            actorId,
            postId,
            commentId,
            type: "mention",
            meta: { snippet: contenido.slice(0, 100) }
        })
    );
    return Promise.all(promises);
}

// ✅ Notificar respuesta a un comentario
async function notifyReply({ parentUserId, actorId, postId, commentId }) {
    return createNotification({
        recipientId: parentUserId,
        actorId,
        postId,
        commentId,
        type: "reply",
    });
}

// ✅ Notificar comentario en un post
async function notifyCommentOnPost({ postUserId, actorId, postId, commentId }) {
    return createNotification({
        recipientId: postUserId,
        actorId,
        postId,
        commentId,
        type: "comment_on_post",
    });
}

// ✅ Obtener notificaciones de un usuario
async function getNotificationsByUser(userId, limit = 20) {
    try {
        return await Notification.findAll({
            where: { recipient_id: userId },
            include: [
                {
                    model: User,
                    as: "actor",
                    attributes: ["id", "nombre", "foto_perfil"],
                },
                {
                    model: Post,
                    as: "post"
                    attributes: ["id", "imagen_url"],
                },
            ],
            order: [["created_at", "DESC"]],
            limit,
        });
    } catch (err) {
        console.error("❌ Error en getNotificationsByUser:", err);
        throw err;
    }
}
// ✅ Marcar una notificación como leída
async function markAsRead(notificationId, userId) {
    const notif = await Notification.findOne({
        where: { id: notificationId, recipient_id: userId }
    });
    if (!notif) return null;
    notif.read_at = new Date();
    await notif.save();
    return notif;
}

// ✅ Marcar todas como leídas
async function markAllAsRead(userId) {
    return await Notification.update(
        { read_at: new Date() },
        { where: { recipient_id: userId, read_at: null } }
    );
}

module.exports = {
    createNotification,
    notifyMentions,
    notifyReply,
    notifyCommentOnPost,
    getNotificationsByUser,
    markAsRead,
    markAllAsRead,
};
