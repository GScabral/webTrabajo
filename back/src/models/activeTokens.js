// models/ActiveToken.js
module.exports = (sequelize, DataTypes) => {
    const ActiveToken = sequelize.define('ActiveToken', {
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'active_tokens',
        timestamps: false
    });

    return ActiveToken;
};
