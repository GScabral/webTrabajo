const { Post } = require('../../db');

const createPost = async ({ titulo, contenido, imagen_url, user_id }) => {
    try {
        if (!titulo || !contenido || !user_id) {
            throw new Error('Faltan datos obligatorios');
        }

        const newPost = await Post.create({
            titulo,
            contenido,
            imagen_url,
            user_id
        });

        return { message: 'Post creado correctamente', post: newPost };
    } catch (error) {
        console.error('Error al crear el post:', error);
        return { error: error.message };
    }
};

module.exports = createPost;