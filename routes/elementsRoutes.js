const Router = require('express')
const allElementsController = require('../controllers/allElementsController')
const FeaturesController = require('../controllers/featuresController')
const FootersController = require('../controllers/footersController')
const HeadersController = require('../controllers/headersController')
const PartnersController = require('../controllers/partnersController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()



router.post('/headers', checkRoleMiddleware('ADMIN'), HeadersController.create)
router.get('/headers', HeadersController.getAll)

router.post('/features',checkRoleMiddleware('ADMIN'), FeaturesController.create)
router.get('/features', FeaturesController.getAll)

router.post('/partners',checkRoleMiddleware('ADMIN'), PartnersController.create)
router.get('/partners', PartnersController.getAll)

router.post('/footers',checkRoleMiddleware('ADMIN'), FootersController.create)
router.get('/footers', FootersController.getAll)


router.get('/allelements', allElementsController.getAll)

module.exports = router