const { Favorite, Trabajador, User } = require("../../db");

const getTrabajadorFav = async (user_id) => {
    const favs = await Favorite.findAll({
        where: { user_id, target_type: "trabajador" },
        include: [
            {
                model: Trabajador,
                as: "trabajador",
                required: false,
                include: [
                    {
                        model: User,
                        as: "usuario", // 👈 este alias debe coincidir con la relación del modelo
                        attributes: ["id", "nombre", "email", "foto_perfil", "telefono"],
                    },
                ],
            },
        ],
        order: [["created_at", "DESC"]],
    });

    return favs;
};

module.exports = getTrabajadorFav;
