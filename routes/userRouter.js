const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()



router.post('/registration', userController.registration)

router.post('/login', userController.login)

router.get('/auth', authMiddleware, userController.check)

router.delete('/saveSite/:id', userController.deleteSite)
router.put('/saveSite', userController.updateSite)
router.post('/saveSite', userController.createSaveSite)
router.get('/saveSite/:userId', userController.getSavesSites)

router.post('/file', userController.postFile)
router.get('/file/:filename', userController.getFile)

module.exports = router