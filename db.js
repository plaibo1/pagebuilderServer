const { Sequelize } = require('sequelize');

const prodSettings = {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
}

module.exports = new Sequelize(
    process.env.DB_CONNECT_URL,
    {
        dialect: 'postgres',
        ...(process.env.PROD === "isProd" && prodSettings)
    }
)