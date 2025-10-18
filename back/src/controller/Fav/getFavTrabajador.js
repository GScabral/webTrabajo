const { Favorite, User } = require("../../db")

const getTrabajadorFav = async (user_id) => {
    if (!user_id) throw new Error("user_id es obligatorio");
    const favsTrabajador = await Favorite.findAll({
        where: { user_id, target_type: "trabajador" },
        include: [{ model: User, as: "trabajador", required: false }],
        order: [["created_at", "DESC"]],
    });
    return favsTrabajador;
}


module.exports = getTrabajadorFav