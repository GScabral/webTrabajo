const { Comment } = require('../../db');

const banComment = async (commentId, baneado = true) => {
    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            throw new Error('Comentario no encontrado');
        }

        await comment.update({ baneado });

        return { message: baneado ? 'Comentario baneado' : 'Comentario desbaneado', comment };
    } catch (error) {
        console.error('Error al banear/desbanear comentario:', error);
        throw error;
    }
};

module.exports = banComment;


//✅ 
