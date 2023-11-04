const {config} = require('dotenv'); //Importo el dotenv para poder crear el archivo .env y usare el objeto 'config'
config();

module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        databse: process.env.DB_DATABASE
    }
}