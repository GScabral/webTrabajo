const { ProfileView, ContactRequest, ProfileStat } = require("../../db")




const newViews = async (req, res) => {
    try {
        const { profile_id, viewer_id, viewer_ip, user_agent } = req.body;

        if (!profile_id) {
            return res.status(400).json({ error: "profile_id es obligatorio" });
        }

        // Registrar la vista
        await ProfileView.create({
            profile_id,
            viewer_id: viewer_id || null,
            viewer_ip,
            user_agent,
        });

        // (Opcional, si NO usás triggers)
        await ProfileStat.upsert({
            profile_id,
            views: Sequelize.literal('views + 1'),
            updated_at: new Date(),
        });

        return res.status(201).json({ message: "Vista registrada correctamente" });
    } catch (error) {
        console.error("Error en newViews:", error);
        return res.status(500).json({ error: "Error al registrar vista" });
    }
};

const addContact = async (req, res) => {
    try {
        const { profile_id, user_id, mensaje } = req.body;

        if (!profile_id || !user_id) {
            return res.status(400).json({ error: "profile_id y user_id son obligatorios" });
        }

        const nuevoContacto = await ContactRequest.create({
            profile_id,
            user_id,
            mensaje: mensaje || null,
        });

        return res.status(201).json(nuevoContacto);
    } catch (error) {
        console.error("Error en addContact:", error);
        return res.status(500).json({ error: "Error al registrar contacto" });
    }
};

// 📞 Obtener todos los registros de contacto (con usuario opcional)
const allContacts = async (req, res) => {
    try {
        const { profile_id } = req.query;

        const whereClause = profile_id ? { profile_id } : {};

        const contacts = await ContactRequest.findAll({
            where: whereClause,
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json(contacts);
    } catch (error) {
        console.error("Error en allContacts:", error);
        return res.status(500).json({ error: "Error al obtener contactos" });
    }
};

// 📊 Obtener estadísticas de perfiles
const allStats = async (req, res) => {
    try {
        const { profile_id } = req.query;

        const whereClause = profile_id ? { profile_id } : {};

        const stats = await ProfileStat.findAll({
            where: whereClause,
            order: [["updated_at", "DESC"]],
        });

        return res.status(200).json(stats);
    } catch (error) {
        console.error("Error en allStats:", error);
        return res.status(500).json({ error: "Error al obtener estadísticas" });
    }
};

module.exports = {
    newViews,
    allContacts,
    allStats,
    addContact,
};