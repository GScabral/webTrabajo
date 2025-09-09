// services/commentService.js
const { Comment, Post, User } = require('../../db');
const notificationService = require("../notification/notificacionesServi"); // 👈 importá tu servicio de notificaciones

async function crearComentario({ contenido, user_id, post_id, parent_comment_id = null }) {
    if (!contenido || !user_id || !post_id) {
        throw new Error('Faltan datos obligatorios');
    }

    // Validar que el post exista
    const post = await Post.findByPk(post_id);
    if (!post) throw new Error('El post no existe');

    // Crear el comentario
    const nuevoComentario = await Comment.create({
        contenido,
        user_id,
        post_id,
        parent_comment_id
    });

    // 📢 Notificación al dueño del post (si no es respuesta a comentario)
    if (!parent_comment_id && post.user_id !== user_id) {
        await notificationService.notifyCommentOnPost({
            postUserId: post.user_id,
            actorId: user_id,
            postId: post_id,
            commentId: nuevoComentario.id
        });
    }

    // 📢 Notificación al dueño del comentario padre (si es respuesta)
    if (parent_comment_id) {
        const parentComment = await Comment.findByPk(parent_comment_id);
        if (parentComment && parentComment.user_id !== user_id) {
            await notificationService.notifyReply({
                parentUserId: parentComment.user_id,
                actorId: user_id,
                postId: post_id,
                commentId: nuevoComentario.id
            });
        }
    }

    // 📢 Notificación a mencionados en el comentario
    const mentionedUserIds = extractMentions(contenido); // 👈 función que parsea @usuario
    if (mentionedUserIds.length > 0) {
        await notificationService.notifyMentions({
            mentionedUserIds,
            actorId: user_id,
            postId: post_id,
            commentId: nuevoComentario.id,
            contenido
        });
    }

    return nuevoComentario;
}

// 👇 helper simple para extraer menciones tipo @usuario
function extractMentions(texto) {
    const regex = /@(\w+)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(texto)) !== null) {
        matches.push(match[1]); // acá capturás el username, luego podés mapearlo a user_id
    }
    return []; // ⚠️ por ahora vacío, deberías resolver usernames → user_ids desde la DB
}

module.exports = crearComentario;
