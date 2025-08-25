// 📦 IMPORTS
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReport, getReportByPost } from "../../../redux/action/adminAction";
import "./Reports.css"; // 🎨 estilos propios

const Reports = () => {
    const dispatch = useDispatch();
    const {reportes, reportsByPost, loading, error } = useSelector(
        (state) => state.adminState
    );

    const [selectedPost, setSelectedPost] = useState(null);

    console.log(reportes)

    useEffect(() => {
        dispatch(getAllReport());
    }, [dispatch]);

    const handleViewReports = (postId) => {
        if (selectedPost === postId) {
            setSelectedPost(null); // cerrar si se vuelve a clickear
        } else {
            setSelectedPost(postId);
            dispatch(getReportByPost(postId));
        }
    };

    if (loading) return <p>⏳ Cargando reportes...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div className="reports-container">
            <h2>📢 Reportes de publicaciones</h2>

            {reportes &&reportes.length > 0 ? (
                <div className="reports-grid">
                    {reportes.map((report, idx) => (
                        <div key={idx} className="report-card">
                            <h4>🚩 Motivo: {report.motivo}</h4>
                            <p><strong>Post ID:</strong> {report.post_id}</p>
                            <p><strong>Usuario ID:</strong> {report.user_id}</p>

                            <button
                                className="view-btn"
                                onClick={() => handleViewReports(report.post_id)}
                            >
                                {selectedPost === report.post_id
                                    ? "🔽 Ocultar detalles"
                                    : "👀 Ver todos los reportes de este post"}
                            </button>

                            {selectedPost === report.post_id && reportsByPost && (
                                <div className="report-details">
                                    <h5>📋 Detalles de reportes:</h5>
                                    {reportsByPost.length > 0 ? (
                                        reportsByPost.map((r, i) => (
                                            <div key={i} className="report-detail">
                                                <p>➡️ <strong>Motivo:</strong> {r.motivo}</p>
                                                <p><strong>Usuario:</strong> {r.user_id}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay más reportes de este post.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>✅ No hay reportes registrados.</p>
            )}
        </div>
    );
};

export default Reports;
