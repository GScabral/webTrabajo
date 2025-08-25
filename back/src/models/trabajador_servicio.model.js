module.exports = (sequelize, DataTypes) => {
    const TrabajadorServicio = sequelize.define('TrabajadorServicio', {}, {
        tableName: 'trabajador_servicio'
    });

    return TrabajadorServicio;
};
