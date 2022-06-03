const ApiError = require('../error/apiError');
const { Partners } = require('../models/models');


class PartnersController {

    async create(req, res) {
        try {
            const {name, info} = req.body;
            const elems = await Partners.create({name, info})
            return res.json(elems)
        }
        catch(err) {
            console.error(err)
        }
    }

    async getAll(req, res) {
        const elems = await Partners.findAll()
        return res.json(elems)
    }

}

module.exports = new PartnersController()