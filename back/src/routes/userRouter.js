const { Router } = require('express');
const { User } = require("../db")
const loginUser = require('../controller/user/loginUser');
const registeredUser = require('../controller/user/registerUser');
const changePassword = require('../controller/user/changePassword');
const deleteUser = require('../controller/user/deleteUser');
const getUserById = require('../controller/user/getUserById')
const resetPasswordUser = require('../controller/user/resetPasswordUser');
const createComment = require('../controller/user/comment')
const updateUser = require('../controller/user/updateUser')
const sendPasswordResetEmail = require("../utils/resetPasswordEmail")
const logout = require("../controller/user/logOutUser")
const getAllUser=require("../controller/user/allUser")
const { addLike, removeLike, getLikesByPost, checkUserLike } = require("../controller/Like/newLike")
const upload = require("../upload")
const authMiddleware = require("../middleware/midelware")
const authenticate = require("../middleware/authenticate")
const crypto = require('crypto');


const router = Router();

//✅ 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginResponse = await loginUser(email, password);

        if (loginResponse.error) {
            return res.status(401).json({ error: loginResponse.error });
        }

        res.status(200).json(loginResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.get('/getAllUser', async (req, res) => {
        try {
            const listUser = await getAllUser();
            res.status(200).json(listUser);
        } catch (error) {
            console.log("error al traer los usuarios;", error);
            res.status(500).json({ error: "Error al traer los usuarios" });
        }
    }
);
router.post('/logout', authenticate, logout);

//✅ 

router.post('/register', upload.single('imagen'), async (req, res) => {
    try {
        // Asegura que la imagen esté disponible en req.file
        const foto_perfil = req.file?.path || "";
        req.body.foto_perfil = foto_perfil;


        const register = await registeredUser(req.body);

        if (register && register.error) {
            res.status(404).json({ error: register.message });
        } else {
            res.status(200).json(register);
        }
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "error en el servidor" });
    }
});

//✅ 

router.post('/comment', async (req, res) => {
    try {
        const { userId, contenido } = req.body;
        const commentResponse = await createComment(userId, contenido);
        res.status(200).json(commentResponse)
    } catch (error) {
        res.status(500).json([error.message || "error interno del servidor "])
    }
})

//✅ 
// Cambiar contraseña (usuario autenticado)
router.patch('/change-password', authMiddleware, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id; // Lo saca del token
        console.log("cambio:", oldPassword)
        console.log("cambio:", newPassword)
        console.log("cambio:", userId)

        const result = await changePassword(userId, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Resetear contraseña (por recuperación)
router.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 60 * 60 * 1000);

        console.log(token)

        await user.update({
            reset_token: token,
            reset_token_expiration: expiration
        });

        await sendPasswordResetEmail(email, token);

        res.status(200).json({ message: 'Se ha enviado un correo para restablecer la contraseña' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

router.patch('/reset-password', async (req, res) => {
    const { email, token, newPassword } = req.body;


    try {
        const result = await resetPasswordUser(email, token, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/userById/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar usuario
router.put('/usuario/:id', upload.single('foto_perfil'), async (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    // Si se subió imagen, agregarla manualmente
    if (req.file?.path) {
        data.foto_perfil = req.file.path;
    }

    console.log("data en back:", data);

    const result = await updateUser(userId, data);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(200).json(result);
});

//✅ 

// Eliminar usuario
router.delete('/userDelete/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const result = await deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Agregar Like
router.post('/like', async (req, res) => {
    const { user_id, post_id } = req.body;
    try {
        if (!user_id || !post_id) {
            return res.status(400).json({ error: "Faltan user_id o post_id en la petición." });
        }
        const result = await addLike(user_id, post_id);
        if (!result) {
            return res.status(500).json({ error: "No se pudo agregar el like." });
        }
        res.status(201).json(result);
    } catch (err) {
        console.error("Error al agregar like:", err);
        if (err.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({ error: "El usuario o el post no existen." });
        }
        res.status(500).json({ error: err.message || "Error interno del servidor." });
    }
});

// Quitar Like
router.delete('/like', async (req, res) => {
    const { user_id, post_id } = req.body;
    try {
        if (!user_id || !post_id) {
            return res.status(400).json({ error: "Faltan user_id o post_id en la petición." });
        }
        const result = await removeLike(user_id, post_id);
        if (!result) {
            return res.status(404).json({ error: "No se encontró el like para eliminar." });
        }
        res.json(result);
    } catch (err) {
        console.error("Error al quitar like:", err);
        res.status(500).json({ error: err.message || "Error interno del servidor." });
    }
});

// Obtener cantidad de likes por post
router.get('/like/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).json({ error: "Falta el parámetro postId." });
        }
        const result = await getLikesByPost(postId);
        res.json(result);
    } catch (err) {
        console.error("Error al obtener likes:", err);
        res.status(500).json({ error: err.message || "Error interno del servidor." });
    }
});

// Verificar si el usuario dio like a un post
router.get('/like/check/:userId/:postId', async (req, res) => {
    try {
        const { userId, postId } = req.params;
        if (!userId || !postId) {
            return res.status(400).json({ error: "Faltan parámetros userId o postId." });
        }
        const result = await checkUserLike(userId, postId);
        res.json({ hasLiked: result });
    } catch (err) {
        console.error("Error al verificar like:", err);
        res.status(500).json({ error: err.message || "Error interno del servidor." });
    }
});








module.exports = router;