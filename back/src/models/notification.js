module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
        recipient_id: { type: DataTypes.INTEGER, allowNull: false },
        actor_id: { type: DataTypes.INTEGER, allowNull: false },
        post_id: { type: DataTypes.INTEGER },
        comment_id: { type: DataTypes.INTEGER },
        type: { type: DataTypes.STRING, allowNull: false },
        meta: { type: DataTypes.JSONB },
        read_at: { type: DataTypes.DATE },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: "notifications",
        timestamps: false
    });


    return Notification;
};
