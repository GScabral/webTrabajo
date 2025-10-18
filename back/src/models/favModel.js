module.exports = (sequelize, DataType) => {
    const Favorite = sequelize.define('Favorite', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false
        },

        target_type: {
            type: DataType.ENUM("post", "trabajador"),
            allowNull: false,
        },
        target_id: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataType.DATE,
            defaultValue: DataType.NOW
        }
    }, {
        tableName: "favorites",
        timestamps: false,
        indexe: [
            { fields: ["user_id"] },
            { fields: ["target_type", "target_id"] },
            { unique: true, fields: ["user_id", "taget_type", "target_id"] }
        ]
    })

    return Favorite;
}