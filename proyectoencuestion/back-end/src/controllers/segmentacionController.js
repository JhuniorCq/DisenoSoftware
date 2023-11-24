const {SegmentacionService} = require('../service/segmentacionService');
const {CrearSegmentacionCommand, MostrarSegmentacionCommand} = require('../command/segmentacionCommand');
const segmentacionService = new SegmentacionService();

//LA USARÉ COMO UNA FUNCIÓN, MAS NO COMO UNA RUTA
const crearSegmentacion = async (req, res, next) => {
    try {
        const crearSegmentacionCommand = new CrearSegmentacionCommand(segmentacionService);

        const segmentacionData = req.body;

        const segmentacion_id = await crearSegmentacionCommand.execute(segmentacionData);

        return segmentacion_id;

    } catch(error) {
        next(error);
    }
}

const mostrarSegmentacion = async (req, res, next) => {
    try {
        const mostrarSegmentacionCommand = new MostrarSegmentacionCommand(segmentacionService);
        const result = await mostrarSegmentacionCommand.execute();

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