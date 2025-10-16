module.exports = (sequelize, DataTypes) => {
    const ProfileView = sequelize.define("ProfileView", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        profile_id: { type: DataTypes.INTEGER, allowNull: false },
        viewer_id: { type: DataTypes.INTEGER },
        viewer_ip: { type: DataTypes.TEXT },
        user_agent: { type: DataTypes.TEXT },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        tableName: "profile_views",
        timestamps: false,
    });



    return ProfileView;
};
