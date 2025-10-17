const { ProfileView, ContactRequest, ProfileStat } = require("../../db")
const { Sequelize } = require('sequelize');



const registrarVistaLogic = async ({ profile_id, viewer_id, viewer_ip, user_agent }) => {
    if (!profile_id) throw new Error('profile_id es obligatorio');

    await ProfileView.create({
        profile_id,
        viewer_id: viewer_id || null,
        viewer_ip,
        user_agent,
    });

    // Usa query SQL nativa para incrementar views
    await sequelize.query(`
    INSERT INTO profile_stats (profile_id, views, updated_at)
    VALUES (:profile_id, 1, NOW())
    ON CONFLICT (profile_id)
    DO UPDATE SET views = profile_stats.views + 1,
                  updated_at = NOW();
  `, { replacements: { profile_id } });

    return { success: true };
};
// ➕ Registrar nuevo contacto
const registrarContactoLogic = async ({ profile_id, user_id, mensaje }) => {
    if (!profile_id || !user_id) throw new Error('profile_id y user_id son obligatorios');

    const nuevoContacto = await ContactRequest.create({
        profile_id,
        user_id,
        mensaje: mensaje || null,
    });

    // Opcional: actualizar contador de contactos
    await ProfileStat.upsert({
        profile_id,
        contacts: Sequelize.literal('contacts + 1'),
        updated_at: new Date(),
    });

    return nuevoContacto;
};

// 📞 Obtener todos los contactos de un perfil
const obtenerContactosLogic = async (profile_id) => {
    const whereClause = profile_id ? { profile_id } : {};
    return await ContactRequest.findAll({
        where: whereClause,
        order: [['created_at', 'DESC']],
    });
};

// 📊 Obtener estadísticas de un perfil
const obtenerEstadisticasLogic = async (profile_id) => {
    const whereClause = profile_id ? { profile_id } : {};
    const stats = await ProfileStat.findOne({
        where: whereClause,
        order: [['updated_at', 'DESC']],
    });

    return stats || { views: 0, contacts: 0 };
};

module.exports = {
    registrarVistaLogic,
    registrarContactoLogic,
    obtenerContactosLogic,
    obtenerEstadisticasLogic,
};