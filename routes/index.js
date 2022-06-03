const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter');
const elementsRoutes = require('./elementsRoutes');
const imagesDataRoutes = require('./imagesDataRoutes');

router.use('/user', userRouter)
router.use('/elements', elementsRoutes)
router.use('/images', imagesDataRoutes)

module.exports = router