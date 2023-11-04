//Importmaos el módulo 'pg' para la BD PostgreSQL
const {Pool} = require('pg');   //Del módulo 'pg' solo traemos a la Clase Pool
const {db} = require('./config');   //Llamo al Objeto db que se está importando en config.js

//CONEXIÓN A LA BASE DE DATOS (en vez de pool puedo poner db también)
//El Objeto 'pool' es un Objeto que usaremos para realizar las Consultas a la BD
const pool = new Pool({ //Dentro de los () va un Objeto para Configurar a qué BD me conectaré
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.databse//Esta debe estar creada en PostgreSQL
});

module.exports = pool;
