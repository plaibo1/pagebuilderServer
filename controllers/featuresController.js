const ApiError = require('../error/apiError');
const { Features } = require('../models/models');


class FeaturesController {

    async create(req, res) {
        try {
            const {name, info} = req.body;
            const elems = await Features.create({name, info})
            return res.json(elems)
        }
        catch(err) {
            console.error(err)
        }
    }

    async getAll(req, res) {
        const elems = await Features.findAll()
        return res.json(elems)
    }

}

module.exports = new FeaturesController()