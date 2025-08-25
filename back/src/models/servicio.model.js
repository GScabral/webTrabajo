module.exports = (sequelize, DataTypes) => {
    const Servicio = sequelize.define('Servicio', {
        nombre: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        categoria: DataTypes.STRING
    }, { tableName: 'servicios' });

    

    return Servicio;
};