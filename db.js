const { Sequelize } = require('sequelize');

// postgres://YourUserName:YourPassword@localhost:5432/YourDatabase

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// )

module.exports = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres'
    }
)