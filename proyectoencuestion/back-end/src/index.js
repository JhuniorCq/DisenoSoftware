const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});