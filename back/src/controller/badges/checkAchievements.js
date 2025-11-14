const badgeCriteria = require("./badgesCriterios.json");
const assignBadge = require("./assingBadge");
const { Badges } = require("../../db");

const checkAchievements = async (user_id, stats) => {
    const unlocked = [];

    console.log("checkBAdge:", user_id, stats)
    for (const badge of badgeCriteria) {
        const { badge_code, criterio, valor, operador } = badge;
        const userValue = Number(stats[criterio]) || 0;

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
            console.log(`✔️ Condición cumplida para badge '${badge_code}' (criterio ${criterio}: ${userValue} ${operador} ${valor})`);

            const badgeDB = await Badges.findOne({ where: { code: badge_code } });

            if (!badgeDB) {
                console.log(`❌ Badge '${badge_code}' no encontrada en la BD`);
                continue;
            }

            const result = await assignBadge({
                user_id,
                badge_id: badgeDB.id,
                metadata: { achieved_at: new Date(), criterio, valor }
            });

            if (!result.alreadyAssigned) {
                unlocked.push(badge);
                console.log(`🏅 Badge '${badge.nombre}' asignada correctamente al usuario ${user_id}`);
            } else {
                console.log(`ℹ️ Badge '${badge.nombre}' ya estaba asignada al usuario ${user_id}`);
            }
        }
    }

    return unlocked;
};

module.exports = checkAchievements;
