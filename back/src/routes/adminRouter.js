const { Router } = require('express');
const getAllUserAdmin = require('../controller/admin/getAllUserAdmin');
const allComment = require('../controller/admin/getAllComment');
const banComment = require('../controller/admin/banComment');
const blockUserAdmin = require("../controller/admin/blockUserAdmin");
const getSystemStats = require("../controller/admin/getSystemStats");
const deleteComment = require("../controller/admin/deletComment");
const unBlockUserAdmin = require("../controller/admin/unBlockUser");
const deletePost = require("../controller/admin/deletePost")
const getReportByPost= require("../controller/admin/getReporByPost")
const obtenerTodosReportes= require("../controller/admin/allReportPost")
// Middlewares
const authenticateAdmin = require("../middleware/authenticate");
const authorize = require("../middleware/authorizeAdmin");

const router = Router();

// ✅ Traer todos los usuarios (solo superadmin)
router.get('/getAllUserAdmin',
    authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        try {
            const listUser = await getAllUserAdmin();
            res.status(200).json(listUser);
        } catch (error) {
            console.log("error al traer los usuarios;", error);
            res.status(500).json({ error: "Error al traer los usuarios" });
        }
    }
);
router.get('/getAllReport',
    authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        try {
            const listReport= await obtenerTodosReportes();
            res.status(200).json(listReport);
        } catch (error) {
            console.log("error al traer los usuarios;", error);
            res.status(500).json({ error: "Error al traer los usuarios" });
        }
    }
);



router.get('/getReportBypost/:id',
    authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        const {id}=req.params
        try {
            const postById = await getReportByPost(id);
            res.status(200).json(postById);
        } catch (error) {
            console.log("error al traer los usuarios;", error);
            res.status(500).json({ error: "Error al traer los usuarios" });
        }
    }
);

// ✅ Estadísticas del sistema (solo superadmin)
router.get('/getStats',
    authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        try {
            const listStats = await getSystemStats();
            res.status(200).json(listStats);
        } catch (error) {
            console.log("error al traer las estadisticas", error);
            res.status(500).json({ error: "Error al traer las estadisticas" });
        }
    }
);

// ✅ Todos los comentarios (moderador + superadmin)
router.get('/getAllComments',
    authenticateAdmin,
    authorize(["moderador", "superadmin"]),
    async (req, res) => {
        try {
            const listComment = await allComment();
            res.status(200).json(listComment);
        } catch (error) {
            console.log("error al traer los comentarios;", error);
            res.status(500).json({ error: "Error al traer los comentarios" });
        }
    }
);

// ✅ Banear comentario (moderador + superadmin)
router.patch("/banComment/:commentId",
    authenticateAdmin,
    authorize(["moderador", "superadmin"]),
    async (req, res) => {
        const { commentId } = req.params;
        const { baneado } = req.body;

        try {
            const commentResponse = await banComment(commentId, baneado);
            res.status(200).json(commentResponse);
        } catch (error) {
            console.log("error al banear el comentario:", error);
            res.status(500).json({ error: "Error al banear el comentario" });
        }
    }
);

// ✅ Bloquear usuario (solo superadmin)
router.patch("/blockUser/:userId",
    authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        const { userId } = req.params;
        const { bloqueado_hasta } = req.body;

        try {
            const blockResponse = await blockUserAdmin(userId, bloqueado_hasta);
            if (blockResponse.error) {
                return res.status(404).json({ error: blockResponse.error });
            }
            res.status(200).json(blockResponse);
        } catch (error) {
            console.log("error al bloquear el usuario:", error);
            res.status(500).json({ error: "Error al bloquear el usuario" });
        }
    }
);

// ✅ Desbloquear usuario (solo superadmin)
router.patch("/unblockUser/:userId",
    authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        const { userId } = req.params;
        try {
            const unBlockResponse = await unBlockUserAdmin(userId);
            if (unBlockResponse.error) {
                return res.status(404).json({ error: unBlockResponse.error });
            }
            res.status(200).json(unBlockResponse);
        } catch (error) {
            console.log("error al desbloquear el usuario:", error);
            res.status(500).json({ error: "Error al desbloquear el usuario" });
        }
    }
);

// ✅ Eliminar comentario (moderador + superadmin)
router.delete("/deleteComment/:commentId",
    authenticateAdmin,
    authorize(["moderador", "superadmin"]),
    async (req, res) => {
        const { commentId } = req.params;
        try {
            const deleteResponse = await deleteComment(commentId);
            res.status(200).json(deleteResponse);
        } catch (error) {
            console.log("error al eliminar el comentario:", error);
            res.status(500).json({ error: "Error al eliminar el comentario" });
        }
    }
);

// ✅ Asignar rol (solo superadmin)
router.post('/assignRole',
    authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        try {
            const { userId, rol } = req.body;

            if (!['moderador', 'superadmin'].includes(rol)) {
                return res.status(400).json({ error: 'Rol inválido' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const adminExistente = await Admin.findOne({ where: { usuario_id: userId } });
            if (adminExistente) {
                return res.status(400).json({ error: 'Este usuario ya tiene un rol de admin' });
            }

            const newAdmin = await Admin.create({
                usuario_id: userId,
                rol
            });

            return res.status(201).json({ message: 'Rol asignado correctamente', admin: newAdmin });
        } catch (error) {
            console.error('Error asignando rol:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
);



router.delete("/delete/:id", authenticateAdmin,
    authorize(["superadmin"]),
    async (req, res) => {
        const { id } = req.params;

        try {
            const result = await deletePost(id);

            if (result.error) {
                return res.status(404).json(result);
            }

            res.status(200).json(result);
        } catch (error) {
            console.error("Error en la ruta DELETE:", error);
            res.status(500).json({ error: "Error al eliminar post" });
        }
    });
module.exports = router;
