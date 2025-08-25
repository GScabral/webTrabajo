module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
        motivo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fecha_reporte: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'reportes',
        timestamps: false
    });

    return Report
}