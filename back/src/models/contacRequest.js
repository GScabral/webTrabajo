module.exports = (sequelize, DataTypes) => {
    const ContactRequest = sequelize.define("ContactRequest", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        profile_id: { type: DataTypes.INTEGER, allowNull: false },
        requester_id: { type: DataTypes.INTEGER },
        method: { type: DataTypes.STRING(50) },
        metadata: { type: DataTypes.JSONB },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        tableName: "contact_requests",
        timestamps: false,
    });



    return ContactRequest;
};
