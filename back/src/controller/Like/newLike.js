const { Like, Post, User } = require('../../db');
const notificationService = require("../notification/notificacionesServi"); // 👈 importa tu servicio de notificaciones

/**
 * 🔥 Dar Like
 */
const addLike = async (user_id, post_id) => {
    const existingLike = await Like.findOne({
        where: { user_id, post_id }
    });

    if (existingLike) {
        throw new Error('Ya has dado like a este post.');
    }

    const newLike = await Like.create({ user_id, post_id });

    // 📢 Notificar al dueño del post
    const post = await Post.findByPk(post_id);
    if (post && post.user_id !== user_id) {
        await notificationService.createNotification({
            recipientId: post.user_id,   // dueño del post
            actorId: user_id,            // quien dio like
            postId: post_id,
            type: "like_post"
        });
    }

    return newLike;
};


/**
 * 🔥 Quitar Like
 */
const removeLike = async (user_id, post_id) => {
    const deleted = await Like.destroy({
        where: { user_id, post_id }
    });

    if (deleted === 0) {
        throw new Error('No se encontró el like.');
    }

    return { message: 'Like eliminado correctamente.' };
};


/**
 * 🔥 Obtener la cantidad de Likes de un post
 */
const getLikesByPost = async (postId) => {
    const likes = await Like.findAll({
        where: { post_id: postId },
        include: [{ model: User, attributes: ['id', 'nombre', 'foto_perfil'] }]
    });

    return {
        totalLikes: likes.length,
        likes
    };
};


/**
 * 🔥 Verificar si un usuario ha dado like a un post
 */
const checkUserLike = async (userId, postId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post no encontrado');

    const like = await Like.findOne({
        where: { user_id: userId, post_id: postId }
    });

    return !!like;
};

/**
 * traer los like de los usuarios para mostrar en el perfiil
 */
const getLikeByUser = async (userId) => {
    const likes = await Like.findAll({
        where: { user_id: userId },
        include: [{ 
            model: Post, 
            attributes: ['id', 'contenido', 'imagen_url', 'titulo'] 
        }]
    });

    if (!likes || likes.length === 0) {
        return { message: "Este usuario no ha dado likes todavía", likes: [] };
    }

    return {
        totalLikes: likes.length,
        likes
    };
};

module.exports = {
    addLike,
    removeLike,
    getLikesByPost,
    checkUserLike,
    getLikeByUser
};
