const { Comment, Post, User } = require('../../db');

const getPostsByUserId = async (userId) => {
    try {
        const posts = await Post.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'nombre', 'foto_perfil']
                },
                {
                    model: Comment,
                    attributes: ['id', 'contenido'],
                    include: {
                        model: User,
                        attributes: ['id', 'nombre']
                    }
                }
            ],
        });

        return posts;
    } catch (error) {
        console.error('❌ Error al obtener los posts del usuario:', error);
        throw error;
    }
};

module.exports = getPostsByUserId;
