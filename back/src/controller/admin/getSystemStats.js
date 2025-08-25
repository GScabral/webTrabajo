const { User, Comment } = require('../../db');

const getSystemStats = async () => {
    try {
        const totalUsuarios = await User.count();
        const totalComentarios = await Comment.count();
        const totalBloqueados = await User.count({ where: { bloqueado: true } });

        return {
            usuarios: totalUsuarios,
            comentarios: totalComentarios,
            bloqueados: totalBloqueados
        };
    } catch (error) {
        console.error('Error obteniendo estadísticas del sistema:', error);
        throw new Error('Error interno del servidor');
    }
};

module.exports = getSystemStats