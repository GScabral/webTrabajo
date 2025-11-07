import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBadges } from "../../redux/action/badgeAction";
import "./badges.css"

const AllBadges = () => {
    const dispatch = useDispatch();
    const badges = useSelector((state) => state.badgeState.allBadges);

    useEffect(() => {
        dispatch(getAllBadges());
    }, [dispatch]);

    console.log("esto llega B:", badges);

    return (
        <div className="badges-container">
            <h1>🏅 BADGES</h1>

            {badges && badges.length > 0 ? (
                <div className="badges-grid">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            className={`badge-card ${!badge.activo ? "inactive" : ""}`}
                        >
                            <img src={badge.icon_url} alt={badge.nombre} />
                            <h2>{badge.nombre}</h2>
                            <p>{badge.descripcion}</p>
                            <div className="badge-info">
                                <p><strong>Tipo:</strong> {badge.tipo}</p>
                                <p><strong>Activo:</strong> {badge.activo ? "Sí ✅" : "No ❌"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: "center", color: "#777" }}>
                    No hay badges disponibles.
                </p>
            )}
        </div>
    );
};
export default AllBadges;
