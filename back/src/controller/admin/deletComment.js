const { Comment } = require('../../db');


const deleteComment = async (commentId) => {
    try {
        const comment = await Comment.findByPk(commentId)
        if (!comment) {
            throw new Error('Comentario no encontrado')
        }
        await comment.destroy()
        return { message: 'Comentario eliminado con éxito', id: commentId };
    } catch (error) {
        console.error('Error al eliminar el comentario:', error)
        throw error
    }
}

module.exports = deleteComment;
