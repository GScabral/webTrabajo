const { Favorite, Post } = require("../../db");

const getPostFav = async (user_id) => {
    if (!user_id) throw new Error("user_id es obligatorio");

    const favs = await Favorite.findAll({
        where: {
            user_id,
            target_type: "post"
        },
        include: [{
            model: Post,
            as: "user",
            required: false
        }],
        order: [["created_at", "DESC"]]
    });

    return favs;
};

module.exports = getPostFav;
