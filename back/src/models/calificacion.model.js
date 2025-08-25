module.exports = (sequelize, DataTypes) => {
    const Calificacion = sequelize.define('Calificacion', {
        puntuacion: DataTypes.INTEGER,
        comentario: DataTypes.TEXT,
        fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        editable: { type: DataTypes.BOOLEAN, defaultValue: false },
        reportado: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { tableName: 'calificaciones' });

    return Calificacion;
};
