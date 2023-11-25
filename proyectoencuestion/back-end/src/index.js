const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
    console.error(error);
    return res.json({
        message: 'Hubo un error en el Servidor'
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});