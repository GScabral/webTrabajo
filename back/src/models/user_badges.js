module.exports = (sequelize, DataTypes) => {
    const UserBadges = sequelize.define("UserBadges", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        badge_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        awarded_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        metadata: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {},
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
        {
            tableName: "user_badges",
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ["user_id", "badge_id"],
                    name: "ux_user_badges_user_badge",
                },
            ],

        }
    );
    return UserBadges;
}












