const ApiError = require('../error/apiError');
const { Headers } = require('../models/models');


class HeadersController {

    async create(req, res) {
        const {name, info} = req.body;
        const elems = await Headers.create({name, info})
        return res.json(elems)
    }

    async getAll(req, res) {
        const elems = await Headers.findAll()
        return res.json(elems)
    }

}

module.exports = new HeadersController()