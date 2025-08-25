// services/commentService.js

const { Comment, Post, User } = require('../../db');

async function crearComentario({ contenido, user_id, post_id }) {
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
        post_id
    });

    return nuevoComentario;
}

module.exports = crearComentario ;
