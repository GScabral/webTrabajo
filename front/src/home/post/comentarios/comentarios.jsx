import { useDispatch } from "react-redux";
import { createComment, getCommentsByPost } from "../../../redux/action/postAction";
import { useState } from "react";

const useComments = () => {
    const dispatch = useDispatch();
    const [commentContent, setCommentContent] = useState('');
    const [commentSubmitting, setCommentSubmitting] = useState(false);

    /**
     * 📢 Manejar envío de comentario
     */
    const handleCommentSubmit = async (postId, userId, parentCommentId = null) => {
        if (!commentContent.trim()) return;
        setCommentSubmitting(true);
        try {
            await dispatch(createComment({
                contenido: commentContent,
                post_id: postId,
                user_id: userId,
                parent_comment_id: parentCommentId // 👈 soporta respuestas
            }));
            setCommentContent('');
            await dispatch(getCommentsByPost(postId));
        } catch (error) {
            console.error("Error al enviar comentario:", error);
        } finally {
            setCommentSubmitting(false);
        }
    };

    return {
        commentContent,
        setCommentContent,
        commentSubmitting,
        handleCommentSubmit
    };
};

export default useComments;
