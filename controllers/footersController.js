const ApiError = require('../error/apiError');
const { Footers } = require('../models/models');


class FootersController {

    async create(req, res) {
        try {
            const {name, info} = req.body;
            const elems = await Footers.create({name, info})
            return res.json(elems)
        }
        catch(err) {
            console.error(err)
        }
    }

    async getAll(req, res) {
        const elems = await Footers.findAll()
        return res.json(elems)
    }

}

module.exports = new FootersController()