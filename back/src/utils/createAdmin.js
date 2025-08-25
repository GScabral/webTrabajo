const { User, Admin } = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const initSuperAdmin = async () => {
  try {
    // 1. Verificar si ya existe algún superadmin
    const superAdmin = await Admin.findOne({ where: { rol: 'superadmin' } });
    if (superAdmin) {
      console.log('✅ Ya existe un superadmin en el sistema');
      return;
    }

    // 2. Datos desde variables de entorno o valores por defecto
    const email = process.env.SUPERADMIN_EMAIL || 'superadmin@miapp.com';
    const password = process.env.SUPERADMIN_PASSWORD || 'MiPasswordSeguro123';
    const nombre = process.env.SUPERADMIN_NAME || 'Super Administrador';

    // 3. Verificar si ya existe un usuario con ese email
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Crear usuario si no existe
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user = await User.create({
        email,
        password_hash: hashedPassword,
        nombre,
        tipo: 'cliente',
        verificado: true
      });
      console.log('🟢 Usuario base del superadmin creado');
    } else {
      console.log('ℹ️ Usuario ya existe, se le asignará rol de superadmin');
    }

    // 4. Crear entrada en Admin
    await Admin.create({
      rol: 'superadmin',
      usuario_id: user.id
    });

    console.log(`🚀 Superadmin inicial listo: ${email}`);
  } catch (error) {
    console.error('❌ Error inicializando superadmin:', error);
  }
};

module.exports = initSuperAdmin;
