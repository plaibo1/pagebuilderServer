const jwt = require("jsonwebtoken");
const ApiError = require("../error/apiError");
const { User } = require("../models/models");
const { UsersSavesSites } = require('../models/models');
const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
const uuid = require('uuid');

const generateJwt = (id, email, role) => {
    return jwt.sign( {id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'} )
}

class UserController {

    async registration(req, res, next) {
        
        const {email, password, role} = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('некорректный email или пароль'))
        }
        
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword})
        
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('неверный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role);
        
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({token})
    }

    async getFile(req, res) {

        const {filename} = req.params;
        
        return res.download(`static/usersSites/${filename}`)

    }

    async postFile(req, res) {
        try {
            const {myHtml, webSiteName} = req.body;
            const filePath = path.resolve(__dirname, '..', 'static', 'css', 'index.html')
            const filePathCSS = path.resolve(__dirname, '..', 'static', 'css', 'style.css')

            let fileName = uuid.v4() + ".html";

            if (!myHtml.length) return res.json('0 elements')

            if (!webSiteName) return res.json('неуказано имя сайта')

            let elementsHTML = '';

             myHtml.forEach(element => {
                 elementsHTML += element.toString()
             })

             fs.readFile(filePath, 'utf-8', (err, data) => {

                if (err) return res.json('some err')
    
                const txt = data.toString().replace(/\r\n/g, '').replace(/myNameIsSecretName/g, webSiteName)

                const resultNoCSS = txt.replace(/myWinWordmyWinWordmyWinWordmyWinWord/g, elementsHTML)


                fs.readFile(filePathCSS, 'utf-8', (err, data) => {
                    if (err) return res.json('some err')
                    
                    const FINAL_PAGE = resultNoCSS.replace(/iwanamystyleseehereSECRETKEY/g, `<style>${data.toString()}</style>`)

                    fs.writeFile(`${__dirname}/../static/usersSites/${fileName}`, FINAL_PAGE, function(err) {
                        if(err) {
                            return console.log(err);
                        }

                        console.log("The file was saved!");
                        
                        return res.json({fileName});
                    });

                    
                })
    
            });

        }
        catch(err) {
            console.log(err)
        }
    }

    async createSaveSite(req, res) {
        try {
            const {siteInfo, userId} = req.body;

            const saveSite = await UsersSavesSites.create({siteInfo, userId});
            return res.json(saveSite);
        }
        catch(err) {
            console.log(err)
            return res.json(err)
        }
    }

    async getSavesSites(req, res) {
        try {

            const {userId} = req.params

            if (!userId) return res.json('kakaya to error')

            const saveSites = await UsersSavesSites.findAll({where: {userId}})
            return res.json(saveSites)

        }
        catch(err) {
            console.log('err----', err)
            return res.json(err)
        }
    }

    async updateSite (req, res) {
        try {
            const {siteInfo, userId} = req.body;

            if(!siteInfo) return res.json('siteInfo error') 
            if(!userId) return res.json('userId error') 

            const saveSite = await UsersSavesSites.update({siteInfo}, {where: {id: userId}})

            return res.json('siteWasSave')
        }
        catch(err) {
            console.log(err)
            return res.json(err)
        }
    }

    async deleteSite (req, res) {
        try {
            const {id} = req.params;

            const deleteSite = await UsersSavesSites.destroy({where: {id}});
            return res.json('siteWasDelete');
        }
        catch(err) {
            console.log(err)
            return res.json(err)
        }
    }

}

module.exports = new UserController()