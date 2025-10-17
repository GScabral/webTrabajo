const { ProfileView, ContactRequest, ProfileStat } = require("../../db")
const { Sequelize } = require('sequelize');



const registrarVistaLogic = async ({ profile_id, viewer_id, viewer_ip, user_agent }) => {
    if (!profile_id) throw new Error('profile_id es obligatorio');

    // guardo el registro de la vista
    await ProfileView.create({
        profile_id,
        viewer_id: viewer_id || null,
        viewer_ip: viewer_ip || null,
        user_agent: user_agent || null
    });

    // incremento (o creo) el contador de vistas usando el modelo ProfileStat
    const [stat, created] = await ProfileStat.findOrCreate({
        where: { profile_id },
        defaults: { profile_id, views: 1, contacts: 0 }
    });

    if (!created) {
        await ProfileStat.increment('views', { by: 1, where: { profile_id } });
        await stat.reload();
    }

    return { success: true };
};
// ➕ Registrar nuevo contacto
const registrarContactoLogic = async ({ profile_id, requester_id, mensaje, method = 'in-app', metadata = {} }) => {
    if (!profile_id || !requester_id) throw new Error('profile_id y requester_id son obligatorios');

    // Guardar la solicitud de contacto usando los campos que define tu modelo (requester_id, method, metadata)
    const nuevoContacto = await ContactRequest.create({
        profile_id,
        requester_id,
        method,
        metadata: { ...metadata, message: mensaje || null },
    });

    // Actualizar (o crear) contador de contactos de forma segura usando el modelo ProfileStat
    const [stat, created] = await ProfileStat.findOrCreate({
        where: { profile_id },
        defaults: { profile_id, views: 0, contacts: 1 }
    });

    if (!created) {
        await ProfileStat.increment('contacts', { by: 1, where: { profile_id } });
        await stat.reload();
    }

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