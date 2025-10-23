const { Favorite } = require("../../db");

const addFav = async ({ user_id, target_type, target_id,metadata }) => {
    try {
        if (!user_id || !target_id || !target_type) {
            throw new Error("informacion insuficeientes falta campos")
        }
        if (!["post", "trabajador"].includes(target_type)) {
            throw new Error("target_type inválido");
        }

        const [fav, created] = await Favorite.findOrCreate({
            where: { user_id, target_type, target_id },
            defaults: { metadata, created_at: new Date() },
        });

        if (!created) {
            return { message: `${target_type} ya estaba en favoritos` };
        }

        return { message: `${target_type} agregado a favoritos correctamente`, fav };
    } catch (error) {
        console.error("error al agregar a favorito:", error);
        throw error;
    }
};


module.exports = addFav;