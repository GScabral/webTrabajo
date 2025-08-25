import { useDispatch } from "react-redux";
import { createComment, getCommentsByPost } from "../../../redux/action/postAction";
import { useState } from "react";

const useComments = () => {
    const dispatch = useDispatch();
    const [commentContent, setCommentContent] = useState('');
    const [commentSubmitting, setCommentSubmitting] = useState(false);

    const handleCommentSubmit = async (postId, userId) => {
        if (!commentContent.trim()) return;
        setCommentSubmitting(true);
        try {
            await dispatch(createComment({
                contenido: commentContent,
                post_id: postId,
                user_id: userId
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
