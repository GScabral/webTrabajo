module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        target_type: {
            type: DataTypes.ENUM('post', 'trabajador'),
            allowNull: false
        },
        target_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'favorites',
        timestamps: false,
        indexes: [
            { fields: ['user_id'] },
            { fields: ['target_type', 'target_id'] },
            { unique: true, fields: ['user_id', 'target_type', 'target_id'] }
        ]
    });

    return Favorite;
};
