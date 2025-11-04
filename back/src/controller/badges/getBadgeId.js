const { Badges } = require("../../db")


const getBadgeById = async (badgeId) => {
    try {
        const badge = await Badges.findByPk(badgeId);
        return badge;
    } catch (error) {
        console.log("Error al traer el badge por ID:", error);
        throw error;
    }
};



module.exports = getBadgeById;