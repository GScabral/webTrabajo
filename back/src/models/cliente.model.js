module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        id: { type: DataTypes.INTEGER, primaryKey: true }
    }, { tableName: 'clientes' });

    return Cliente;
};