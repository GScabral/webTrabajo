const { Favorite } = require("../../db");

const addFav = async ({ user_id, target_type, target_id, metadata }) => {
    try {
        // 1️⃣ Validaciones básicas
        if (!user_id || !target_type || !target_id) {
            throw new Error("Información insuficiente: faltan campos obligatorios");
        }

        // 2️⃣ Validar tipo permitido
        const allowedTypes = ["post", "trabajador"];
        if (!allowedTypes.includes(target_type)) {
            throw new Error(`target_type inválido. Usa uno de: ${allowedTypes.join(", ")}`);
        }

        // 3️⃣ Construir los datos que se guardarán
        const favData = {
            user_id,
            target_type,
            target_id,
            metadata: metadata || {},
            created_at: new Date()
        };

        // 4️⃣ Buscar o crear el favorito
        const [fav, created] = await Favorite.findOrCreate({
            where: { user_id, target_type, target_id },
            defaults: favData
        });

        // 5️⃣ Respuesta final
        if (!created) {
            return { success: false, message: `${target_type} ya estaba en favoritos`, fav };
        }

        return { success: true, message: `${target_type} agregado a favoritos correctamente`, fav };

    } catch (error) {
        console.error("❌ Error al agregar a favorito:", error);
        throw new Error(error.message || "Error desconocido al agregar a favorito");
    }
};

module.exports = addFav;
