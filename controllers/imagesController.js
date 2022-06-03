const ApiError = require('../error/apiError');
const { ImagesData } = require('../models/models');
const uuid = require('uuid');
const path = require('path')


class ImagesController {

    async create(req, res, next) {
        try {
            const {img} = req.files

            let fileName = uuid.v4() + ".png";
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const elem = await ImagesData.create({imgName: fileName})
            return res.json(elem)
        }
        catch(err) {
            next(ApiError.badRequest(err.message))
            console.error(err)
        }
    }

    async getAll(req, res) {
        const elems = await ImagesData.findAll()
        return res.json(elems)
    }

}

module.exports = new ImagesController()