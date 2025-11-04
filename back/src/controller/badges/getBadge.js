const { Badges } = require("../../db")


const getBadges = async () => {

    try {
        const allBadges = await Badges.findAll();

        return allBadges
    } catch (error) {
        throw error;
    }
}

module.exports = getBadges