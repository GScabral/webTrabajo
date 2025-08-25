import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsAdmin } from "../../redux/action/adminAction";
import "./stats.css"
const StatsAdmin = () => {
    const dispatch = useDispatch();
    const { stats, loading, error } = useSelector((state) => state.adminState);

    useEffect(() => {
        dispatch(statsAdmin());
    }, [dispatch]);

    console.log("stats en el componente:", stats);
    return (
        <div>
            <h1>Estadísticas</h1>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            {stats && (
                <div className="stats-container">
                    <div className="stat-card">
                        <p className="stat-title">Usuarios</p>
                        <p className="stat-value">{stats.usuarios}</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-title">Comentarios</p>
                        <p className="stat-value">{stats.comentarios}</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-title">Bloqueados</p>
                        <p className="stat-value">{stats.bloqueados}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsAdmin;
