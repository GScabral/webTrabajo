const { Comment, Post, User } = require('../../db');

const getPostById = async (postId) => {
    try {
        const infoPost = await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'nombre', 'foto_perfil', 'email'] // añade lo que quieras
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nombre', 'foto_perfil']
                        }
                    ]
                }
            ]
        });

        return infoPost;
    } catch (error) {
        console.log("Error al traer el post por ID", error);
        throw error;
    }
};

module.exports = getPostById;
