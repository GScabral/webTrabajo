const { Post } = require('../../db');

const deletePost = async (postId) => {
    try {
        if (!postId) {
            throw new Error("Falta el ID del post");
        }

        // Busca el post
        const post = await Post.findByPk(postId);
        if (!post) {
            return { error: "Post no encontrado" };
        }

        // Eliminar
        await post.destroy();

        return { message: "Post eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        return { error: error.message };
    }
};

module.exports = deletePost;
