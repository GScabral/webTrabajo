module.exports = (sequelize, DataTypes) => {
    const Badges = sequelize.define('Badges', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique:true
        },
        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        icon_url: {
            type: DataTypes.TEXT,
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        tableName:"badges",
        timestamps:false,
    })

    return Badges;
}









