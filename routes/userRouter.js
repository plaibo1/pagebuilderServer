const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()



router.post('/registration', userController.registration)

router.post('/login', userController.login)

router.get('/auth', authMiddleware, userController.check)

router.post('/file', userController.postFile)
router.get('/file', userController.getFile)

module.exports = router