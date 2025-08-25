module.exports = (sequelize, DataTypes) => {
    const Trabajador = sequelize.define('Trabajador', {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        descripcion: DataTypes.TEXT,
        tarifa_minima: DataTypes.DECIMAL,
        tarifa_maxima: DataTypes.DECIMAL,
        disponibilidad: DataTypes.JSON,
        promedio_valoracion: { type: DataTypes.DECIMAL, defaultValue: 0 },
        numero_valoraciones: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, { tableName: 'trabajadores' });



    return Trabajador;
};