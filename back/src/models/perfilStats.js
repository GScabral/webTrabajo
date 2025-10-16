module.exports = (sequelize, DataTypes) => {
    const ProfileStat = sequelize.define("ProfileStat", {
        profile_id: { type: DataTypes.INTEGER, primaryKey: true },
        views: { type: DataTypes.BIGINT, defaultValue: 0 },
        contacts: { type: DataTypes.BIGINT, defaultValue: 0 },
        reviews_count: { type: DataTypes.BIGINT, defaultValue: 0 },
        rating_avg: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0 },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        tableName: "profile_stats",
        timestamps: false,
    });



    return ProfileStat;
};
