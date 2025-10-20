import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newFav, removeFavAcc } from "../../redux/action/favoriteAction";

const FavHandling = ({ postId, initialCount = 0, initiallyFavorited = false, onToggle }) => {
    const dispatch = useDispatch();
    const infoUser = useSelector((state) => state.userState.infoLogin);
    const [favCount, setFavCount] = useState(initialCount);
    const [isFavorited, setIsFavorited] = useState(initiallyFavorited);
    const [loading, setLoading] = useState(false);

    console.log("esto tiene que llegar:",postId)

    useEffect(() => {
        setFavCount(initialCount);
    }, [initialCount]);

    useEffect(() => {
        setIsFavorited(initiallyFavorited);
    }, [initiallyFavorited]);

    const handleFavToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!infoUser || !infoUser.id) {
            // ajustar comportamiento según tu app (redirect a login, toast, etc.)
            alert("Debes iniciar sesión para marcar favoritos.");
            return;
        }

        setLoading(true);
        try {
            if (isFavorited) {
                // remove favorite
                await dispatch(removeFavAcc(infoUser.id, "post", postId));
                setFavCount((c) => Math.max(0, c - 1));
                setIsFavorited(false);
                onToggle?.({ action: "removed", postId });
            } else {
                // add favorite
                await dispatch(newFav({ user_id: infoUser.id, target_type: "post", target_id: postId }));
                setFavCount((c) => c + 1);
                setIsFavorited(true);
                onToggle?.({ action: "added", postId });
            }
        } catch (err) {
            console.error("Fav toggle error:", err);
            // Considerar revert optimistic update si falla
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`fav-btn ${isFavorited ? "favorited" : ""}`}
            onClick={handleFavToggle}
            disabled={loading}
            aria-pressed={isFavorited}
            title={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
            {isFavorited ? "💖" : "🤍"} <span className="fav-count">{favCount}</span>
        </button>
    );
};

export default FavHandling;