const { Router } = require('express');
const addFav = require("../controller/Fav/newFav")
const removeFav = require("../controller/Fav/removeFav")
const getPostFav = require("../controller/Fav/getFavPost")
const getTrabajadorFav = require("../controller/Fav/getFavTrabajador")


const router = Router()

router.post("/addFav", async (req, res) => {
    try {
        const { user_id, target_type, target_id, metadata } = req.body


        if (!user_id || !target_type || !target_id) {
            return res.status(400).json({ error: "Faltan campos: user_id, target_type o target_id" });
        }
        const response = await addFav({ user_id, target_type, target_id, metadata })

        if (response.error) {
            return res.status(400).json({ error: response.error });
        }

        res.status(201).json(response)
    } catch (error) {
        console.error("erro en POSt /addFav", error)
        res.status(500).json({ error: error.message || 'errror interno del servidor' })
    }
})

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


router.delete("/removeFav/:user_id/:target_type/:target_id", async (req, res) => {
    try {
        const { user_id, target_type, target_id } = req.params;
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