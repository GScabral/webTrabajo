const { Favorite, User } = require("../../db")

const getTrabajadorFav = async (user_id) => {
    const favs = await Favorite.findAll({
        where: { user_id, target_type: "trabajador" },
        include: [{ model: User, as: "user", required: false }],
        order: [["created_at", "DESC"]],
    });
    return favs;
};

module.exports = getTrabajadorFav;