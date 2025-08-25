const { Router } = require('express');
const getAllPost = require("../controller/posts/getAllPost");
const createPost = require("../controller/posts/newPost")
const crearComentario = require("../controller/posts/createComment")
const obtenerComentariosPorPost = require("../controller/posts/getComment")
const getPostById = require("../controller/posts/byIdPost")
const getPostsByUserId = require("../controller/posts/byUserPost")
const authenticate = require("../middleware/authenticate")
const deletePost = require("../controller/posts/deletePostByUser")
const crearReporte = require("../controller/posts/createReport")

const upload = require("../upload")

const router = Router();

router.get("/getAllPost", async (req, res) => {
    try {
        const allPost = await getAllPost();
        res.status(200).json(allPost)
    } catch (error) {
        res.status(404).json(error)
    }
})


router.get("/getAllPostUser/:userId", async (req, res) => {
    try {
        const allPostUser = await getPostsByUserId(req.params.userId);
        res.status(200).json(allPostUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.post('/postear', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, contenido, user_id } = req.body;

        const imagen_url = req.file?.path || ""; // Cloudinary ya devuelve la URL en `file.path`

        const response = await createPost({ titulo, contenido, imagen_url, user_id });

        if (response.error) {
            return res.status(400).json({ error: response.error });
        }

        res.status(201).json(response);
    } catch (error) {
        console.error("Error en POST /postear:", error);
        res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
});

router.post("/reportPost", async (req, res) => {
    try {
        const { motivo, post_id, user_id } = req.body;


        if (!motivo || !post_id || !user_id) {
            return res.status(400).json({ error: "No se pudo crear el report" })
        }

        const report = await crearReporte({ motivo, post_id, user_id })


        if (!report) {
            return res.status(500).json({ error: "No se pudo crear el report." });
        }
        res.status(201).json(report);
    }catch (error) {
        console.error("Error al crear comentario:", error);
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({ error: "El post o usuario no existe." });
        }
        res.status(500).json({ error: error.message || "Error interno del servidor." });
    }
});

// routes/commentRoutes.js


// POST /api/comments
router.post('/comentar', async (req, res) => {
    try {
        const { contenido, post_id, user_id } = req.body;


        if (!contenido || !post_id || !user_id) {
            return res.status(400).json({ error: "Faltan datos obligatorios para comentar." });
        }

        const comentario = await crearComentario({ contenido, user_id, post_id });

        if (!comentario) {
            return res.status(500).json({ error: "No se pudo crear el comentario." });
        }

        res.status(201).json(comentario);
    } catch (error) {
        console.error("Error al crear comentario:", error);
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({ error: "El post o usuario no existe." });
        }
        res.status(500).json({ error: error.message || "Error interno del servidor." });
    }
});

// GET /api/comments/post/:postId
router.get('/post/:postId', async (req, res) => {
    try {
        const comentarios = await obtenerComentariosPorPost(req.params.postId);
        res.json(comentarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/postById/:postId', async (req, res) => {
    try {
        const infoPostId = await getPostById(req.params.postId);
        res.json(infoPostId);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.delete("/delete/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;     // viene del token
    const userRole = req.user.role;  // también del token


    try {
        const result = await deletePost(id, userId, userRole);

        if (result.error) {
            return res.status(403).json(result); // 403 si no es dueño
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error en la ruta DELETE:", error);
        res.status(500).json({ error: "Error al eliminar post" });
    }
});





module.exports = router;