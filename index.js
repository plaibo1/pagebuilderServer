require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
    origin: ['https://pagebuilder-neon.vercel.app/', 'http://localhost:3000/']
}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)



// last
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        
        app.listen(PORT, () => {
            console.log('server has been started on port ' + PORT);
        })
    }
    catch(err) {
        console.log(err)
    }
}

start()

