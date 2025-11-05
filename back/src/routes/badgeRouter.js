const { Router } = require('express');
const newBadge = require("../controller/badges/newBadge")
const getBadges = require("../controller/badges/getBadge")
const getBadgeById = require("../controller/badges/getBadgeId")
const assingBadge = require("../controller/badges/assingBadge")

const router = Router();


router.post("/assignBadge", async (req, res) => {
    try {
        const { user_id, badge_id, metadata } = req.body;

        const missingFields = [];
        if (!user_id) missingFields.push("user_id");
        if (!badge_id) missingFields.push("badge_id");

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Faltan campos obligatorios: ${missingFields.join(", ")}`,
            });
        }

        const response = await assingBadge({ user_id, badge_id, metadata });

        res.status(201).json({
            success: true,
            message: response.alreadyAssigned
                ? "El usuario ya tiene esta badge."
                : "Badge asignada correctamente.",
            data: response.badge,
        });
    } catch (error) {
        console.error("❌ Error en POST /assignBadge:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error.message,
        });
    }
});




router.get("/getBadges", async (req, res) => {
    try {
        const allBadge = await getBadges();
        res.status(200).json(allBadge)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/getBadgeById/:badgeId", async (req, res) => {
    try {
        const badgeById = await getBadgeById(req.params.badgeId);
        if (!badgeById)
            return res.status(404).json({ message: "Badge no encontrada" });
        res.status(200).json(badgeById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});