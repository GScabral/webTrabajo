module.exports = (sequelize, DataTypes) => {
    const Reserva = sequelize.define('Reserva', {
        fecha_solicitada: DataTypes.DATEONLY,
        estado: {
            type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada', 'completada'),
            defaultValue: 'pendiente'
        },
        detalles: DataTypes.TEXT,
        precio_estimado: DataTypes.DECIMAL
    }, { tableName: 'reservas' });

    return Reserva;
};
