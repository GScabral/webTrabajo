const badgeCriteria = require("./badgesCriterios.json");
const assignBadge = require("./assingBadge");
const { Badges } = require("../../db");

const checkAchievements = async (user_id, stats) => {
    const unlocked = [];

    console.log("checkBAdge:", user_id, stats)
    for (const badge of badgeCriteria) {
        const { badge_code, criterio, valor, operador } = badge;
        const userValue = stats[criterio] || 0;

        let meetsCondition = false;

        switch (operador) {
            case ">=":
                meetsCondition = userValue >= valor;
                break;
            case ">":
                meetsCondition = userValue > valor;
                break;
            case "==":
                meetsCondition = userValue === valor;
                break;
            default:
                meetsCondition = false;
        }

        if (meetsCondition) {
            // Busca badge_id en tu tabla Badge (relación con badge_code)
            const badgeDB = await Badges.findOne({ where: { code: badge_code } });

            if (badgeDB) {
                const result = await assignBadge({
                    user_id,
                    badge_id: badgeDB.id,
                    metadata: { achieved_at: new Date(), criterio, valor }
                });

                if (!result.alreadyAssigned) {
                    unlocked.push(badge);
                    console.log(`🏅 ${badge.nombre} asignado a usuario ${user_id}`);
                }
            }
        }
    }

    return unlocked;
};

module.exports = checkAchievements;
