import React, { useEffect, useState } from "react";
import { getAdminCommetn, deleteComment } from "../../redux/action/adminAction";
import { useSelector, useDispatch } from "react-redux";

import "./adminComment.css"

const AdminComment = () => {
    const dispatch = useDispatch()
    const allComment = useSelector(state => state.adminState.allComent)
    const [openMenu, setOpenMenu] = useState(null);



    useEffect(() => {
        dispatch(getAdminCommetn())
    }, [dispatch])

    const handleDeleteCommet = (commentId) => {
        dispatch(deleteComment(commentId))
        setOpenMenu(null)
    }

    const groupedComments = allComment.reduce((acc, comment) => {
        if (!acc[comment.user_id]) {
            acc[comment.user_id] = [];
        }
        acc[comment.user_id].push(comment);
        return acc;
    }, {});


    console.log(allComment)

    return (
        <div>
            <div className="adminCommentGrid">
                {Object.keys(groupedComments).map((userId) => (
                    <div key={userId} className="userCommentColumn">
                        <h3>Usuario {userId}</h3>
                        {groupedComments[userId].map((comment) => (
                            <div key={comment.id} className="commentAdmin-card">
                                <div className="menuWrapper-Coment">
                                    <button
                                        className="menuButton-Coment"
                                        onClick={() =>
                                            setOpenMenu(openMenu === comment.id ? null : comment.id)
                                        }
                                    >
                                        ⋮
                                    </button>

                                    {openMenu === comment.id && (
                                        <div className="menuDropdown-Coment">
                                            <button onClick={() => handleDeleteCommet(comment.id)}>
                                                🗑 Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p className="commentAdmin-content">{comment.contenido}</p>
                                <span className="commentAdmin-date">
                                    {new Date(comment.fecha).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminComment;