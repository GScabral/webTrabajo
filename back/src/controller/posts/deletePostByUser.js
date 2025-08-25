const { Post } = require('../../db');

const deletePost = async (postId, userId, userRole) => {
    try {
        if (!postId || !userId) {
            throw new Error("Faltan datos");
        }

        // Busca el post
        const post = await Post.findByPk(postId);
        if (!post) {
            return { error: "Post no encontrado" };
        }

        // Verifica permisos: dueño o admin
        if (post.user_id !== userId && userRole !== "admin" && userRole !== "superadmin") {
            return { error: "No tienes permisos para eliminar este post" };
        }

        await post.destroy();
        return { message: "Post eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        return { error: error.message };
    }
};

module.exports = deletePost;
