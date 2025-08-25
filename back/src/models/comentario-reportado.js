module.exports = (sequelize, DataTypes) => {
    const ComentarioReportado = sequelize.define('ComentarioReportado', {
        motivo: DataTypes.TEXT,
        fecha_reporte: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        resuelto: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { tableName: 'comentario_reportado' });

    return ComentarioReportado;
};
