const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Elements = sequelize.define('elements', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    elementName: {type: DataTypes.JSON, allowNull: false}
})

const Headers = sequelize.define('headers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    info: {type: DataTypes.JSON, allowNull: false}
})

const Features = sequelize.define('features', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    info: {type: DataTypes.JSON, allowNull: false}
})

const Partners = sequelize.define('partners', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    info: {type: DataTypes.JSON, allowNull: false}
})

const Footers = sequelize.define('footers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    info: {type: DataTypes.JSON, allowNull: false}
})

const ImagesData = sequelize.define('imagesData', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    imgName: {type: DataTypes.STRING, allowNull: false, unique: true}
})


const ALLELEMENTS = [
    HEADERS = {
      name: 'Headers',
      dbName: 'headers',
    },
    FEATURES = {
      name: 'Features',
      dbName: 'features',
    },
    PARTNERS = {
      name: 'Partners',
      dbName: 'partners',
    },
    FOOTERS ={
      name: 'Footers',
      dbName: 'footers',
    },
]



module.exports = {
    User,
    Headers,
    Elements,
    Features,
    Partners,
    Footers,
    ImagesData,
    ALLELEMENTS
}
