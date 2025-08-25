// services/commentService.js

const { Comment, User } = require('../../db');

const obtenerComentariosPorPost = async (post_id) => {
  if (!post_id) {
    throw new Error('Falta el post_id');
  }

  const comentarios = await Comment.findAll({
    where: { post_id },
    include: [
      {
        model: User,
        attributes: ['id', 'nombre', 'foto_perfil']
      }
    ],
    order: [['fecha', 'DESC']]
  });

  return comentarios;
};

module.exports = obtenerComentariosPorPost;
