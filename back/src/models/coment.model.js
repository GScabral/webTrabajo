module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        contenido: { type: DataTypes.TEXT, allowNull: false },
        fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        post_id: { type: DataTypes.INTEGER, allowNull: false } // ← ¡esta es la clave!
    }, {
        tableName: 'comments',
        timestamps: false
    });

    return Comment;
};
