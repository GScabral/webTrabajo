const { UserBadges } = require("../../db")


const assingBadge = async ({ user_id, badge_id, metadata }) => {
    const exists = await UserBadges.findOne({ where: { user_id, badge_id } });

    if (exists) return { alreadyAssigned: true, badge: exists };

    const newBadge = await UserBadges.create({ user_id, badge_id, metadata });

    return { alreadyAssigned: false, badge: newBadge };
};


module.exports =  assingBadge ;
