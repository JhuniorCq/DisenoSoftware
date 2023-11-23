const {SegmentacionService} = require('../service/segmentacionService');
const {CrearSegmentacionCommand, MostrarSegmentacionCommand} = require('../command/segmentacionCommand');
const segmentacionService = new SegmentacionService();

//CREAR SEGMENTACION SE PUEDE IR CREO
const crearSegmentacion = (req, res, next) => {
    try {
        const crearSegmentacionCommand = new CrearSegmentacionCommand(segmentacionService);

        const segmentacionData = req.body;

        const result = crearSegmentacionCommand.execute(segmentacionData);

        console.log(result);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

const mostrarSegmentacion = (req, res, next) => {
    try {
        const mostrarSegmentacionCommand = new MostrarSegmentacionCommand(segmentacionService);
        const result = mostrarSegmentacionCommand.execute();

        console.log(result);
        console.log(`Esto es después del Result, NO se imprime el contenido del Result, se imprime una 'Promesa Pendiente'`);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

module.exports = {
    crearSegmentacion: crearSegmentacion,
    mostrarSegmentacion: mostrarSegmentacion
}