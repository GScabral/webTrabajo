const { Favorite, Trabajador,User } = require("../../db");

const getTrabajadorFav = async (user_id) => {
    const favs = await Favorite.findAll({
        where: { user_id, target_type: "trabajador" },
        include: [
            {
                model: Trabajador,
                as: "trabajador", // 👈 este alias debe coincidir con el definido en tu asociación
                required: false,
            },
            {
                model:User,
                attributes:['email', 'foto_perfil','nombre','telefono']
            }
        ],
        order: [["created_at", "DESC"]],
    });
    return favs;
};

module.exports = getTrabajadorFav;
