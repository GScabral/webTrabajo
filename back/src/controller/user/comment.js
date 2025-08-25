const { Comment } = require('../../db');

const createComment = async (userId, contenido) => {
    try {
        if (!contenido) {
            throw new Error('El contenido del comentario es obligatorio');
        }

        const comment = await Comment.create({
            user_id: userId,
            contenido
        });

        return { message: 'Comentario creado correctamente', comment };
    } catch (error) {
        console.error('Error al crear comentario:', error);
        throw error;
    }
};

module.exports = createComment;