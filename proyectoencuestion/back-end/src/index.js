const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

app.use(cors({
    origin: ['http://localhost:3000', 'https://modulo-marketing.onrender.com', 'https://clientemodulocrm.onrender.com/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
    return res.json({
        message: 'Hubo un error en el Servidor'
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});