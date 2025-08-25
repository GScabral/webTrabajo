const { Post, User, Like } = require('../../db');

const getAllPost = async () => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'nombre', 'foto_perfil', 'tipo', 'ubicacion'],
                    include: [
                        {
                            model: require('../../db').Trabajador,
                            attributes: ['descripcion', 'tarifa_minima', 'tarifa_maxima', 'disponibilidad', 'promedio_valoracion'],
                            include: [
                                {
                                    model: require('../../db').Servicio,
                                    attributes: ['id', 'nombre']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Like,
                    attributes: ['id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['id', 'nombre', 'foto_perfil']
                    }
                }
            ]
        });
        return posts;
    } catch (error) {
        console.log("Error al traer los posts", error);
        throw error;
    }
};


module.exports = getAllPost;
