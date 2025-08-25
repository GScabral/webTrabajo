module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.TEXT, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.ENUM('cliente', 'trabajador'), allowNull: false },
    foto_perfil: DataTypes.TEXT,
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    verificado: { type: DataTypes.BOOLEAN, defaultValue: false },
    ubicacion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    bloqueado: { type: DataTypes.BOOLEAN, defaultValue: false },
    bloqueado_hasta: { type: DataTypes.DATE, allowNull: true },
    reset_token: { type: DataTypes.STRING, allowNull: true },
    reset_token_expiration: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'users',
    timestamps: false
  });



  return User;
};