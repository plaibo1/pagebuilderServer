const Router = require('express')
const ImagesController = require('../controllers/imagesController')
const router = new Router()

router.post('/add-image', ImagesController.create)
router.get('/add-image', ImagesController.getAll)

module.exports = router