const ApiError = require('../error/apiError');
const { ALLELEMENTS } = require('../models/models');


class AllElementsController {

    async getAll(req, res) {
        return res.json(ALLELEMENTS)
    }

}

module.exports = new AllElementsController()