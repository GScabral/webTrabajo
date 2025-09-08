const { Router } = require('express')

const userRouters = require('./userRouter')
const adminRouter = require('./adminRouter')
const postRouter = require("./postRouter")
const servicioRouter = require("./servicioRouter")
const trabajadorRouter = require("./trabajadorRouter")
const mensajesRouter = require("./mensajesRoute")
const notificationRouter = require("./notificationRouter")
const router = Router();

router.use('/user', userRouters);
router.use('/admin', adminRouter);
router.use('/posts', postRouter)
router.use('/servicio', servicioRouter)
router.use('/trabajador', trabajadorRouter)
router.use('/mensaje', mensajesRouter)
router.use('/notification', notificationRouter)

module.exports = router;