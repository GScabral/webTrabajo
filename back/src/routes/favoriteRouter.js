const { Router } = require('express');
const addFav = require("../controller/Fav/newFav")
const removeFav = require("../controller/Fav/removeFav")
const getPostFav = require("../controller/Fav/getFavPost")
const getTrabajadorFav = require("../controller/Fav/getFavTrabajador")


const router = Router()
router.post("/addFav", async (req, res) => {
    try {
        console.log("🔎 Body recibido en /addFav:", req.body);

        const { user_id, target_type, target_id, metadata } = req.body;

        // Validaciones más claras
        const missingFields = [];
        if (!user_id) missingFields.push("user_id");
        if (!target_type) missingFields.push("target_type");
        if (!target_id) missingFields.push("target_id");

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Faltan campos obligatorios: ${missingFields.join(", ")}`,
            });
        }

        // Validación del tipo de favorito
        const allowedTypes = ["post", "trabajador"];
        if (!allowedTypes.includes(target_type)) {
            return res.status(400).json({
                success: false,
                message: `Tipo de favorito no válido. Usa uno de: ${allowedTypes.join(", ")}`,
            });
        }

        // Llamada al servicio
        const response = await addFav({ user_id, target_type, target_id, metadata });

        if (response.error) {
            return res.status(400).json({
                success: false,
                message: response.error,
            });
        }

        res.status(201).json({
            success: true,
            message: "Favorito agregado correctamente",
            data: response,
        });
    } catch (error) {
        console.error("❌ Error en POST /addFav:", error);

        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error.message,
        });
    }
});

router.get("/getPostFav/:user_id", async (req, res) => {
    try {
        console.log(req.params)

        const user_id = req.params.user_id;
        if (!user_id) return res.status(400).json({ error: "user_id requerido" });
        const postFav = await getPostFav(user_id);
        res.status(200).json(postFav);
    } catch (error) {
        console.error("error en GET /getPostFav", error);
        return res.status(500).json({ error: error.message || 'error interno' });
    }
})
router.get("/getTrabajadoresFav/:user_id", async (req, res) => {
    try {

        console.log(req.params)
        const user_id = req.params.user_id;

        if (!user_id) return res.status(400).json({ error: "user_id requerido" });
        const trabajadorFav = await getTrabajadorFav(user_id);
        res.status(200).json(trabajadorFav);
    } catch (error) {
        console.error("error en GET /getTrabajadoresFav", error);
        return res.status(500).json({ error: error.message || 'error interno' });
    }
})


router.post("/removeFav", async (req, res) => {
    const { user_id, target_type, target_id } = req.body;
    try {
        if (!user_id || !target_type || !target_id) {
            return res.status(400).json({ error: "user_id, target_type y target_id son requeridos" });
        }
        const remove = await removeFav(user_id, target_type, target_id)
        res.status(200).json(remove)
    } catch (error) {
        console.error("Error en al ruta delete:", error);
        res.status(500).json({ error: "error al remover Fav" })
    }
})


module.exports = router;