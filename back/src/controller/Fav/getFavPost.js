const { Favorite, Post } = require("../../db");

const getPostFav = async (user_id) => {
    const favs = await Favorite.findAll({
        where: { user_id, target_type: "post" },
        include: [{ model: Post, as: "post", required: false }],
        order: [["created_at", "DESC"]],
    });
    return favs;
};

module.exports = getPostFav;
