module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    rol: DataTypes.ENUM('moderador', 'superadmin')
  }, { tableName: 'admin' });

  return Admin;
};
