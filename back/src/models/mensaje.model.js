module.exports = (sequelize, DataTypes) => {
    const Mensaje = sequelize.define('Mensaje', {
        contenido: DataTypes.TEXT,
        fecha_envio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        leido: { type: DataTypes.BOOLEAN, defaultValue: false },
        emisor_id: { type: DataTypes.INTEGER, allowNull: false },
        receptor_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'mensajes' });

    return Mensaje;
};