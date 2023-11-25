const {Pool} = require('pg');
const {db} = require('./config');//Borrar :v al ...

const pool = new Pool({
    user: "modulomarketing_user",
    password: "HVpxtC4kWQWF7r2Qi4LSbg2RTKs1i1oD",
    host: "dpg-cl1gju0p2gis73f3v5ug-a.oregon-postgres.render.com",
    port: 5432,
    database: "modulomarketing",
    ssl: true
});

// const pool = new Pool({
//     user: db.user,
//     password: db.password,
//     host: db.host,
//     port: db.port,
//     database: db.database,
//     ssl: true
// });

module.exports = pool;
