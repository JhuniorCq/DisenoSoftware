const {SegmentacionService} = require('../service/segmentacionService');
const {CrearSegmentacionCommand/*, MostrarSegmentacionCommand*/} = require('../command/segmentacionCommand');
const segmentacionService = new SegmentacionService();

//ESTA RUTA DEBE ESTAR EN EL BOTÓN -> GUARDAR 
const crearSegmentacion = async (req, res, next) => {
    try {
        const crearSegmentacionCommand = new CrearSegmentacionCommand(segmentacionService);

        const segmentacionData = req.body;

        const result = await crearSegmentacionCommand.execute(segmentacionData);

        res.json(result);

    } catch(error) {
        next(error);
    }
}

//Lo puedo Descomentar si quiero mostrar como un response a los datos de una o todas las Segmentaciones

// const mostrarSegmentacion = async (req, res, next) => {
//     try {
//         const mostrarSegmentacionCommand = new MostrarSegmentacionCommand(segmentacionService);
//         const ultimaSegmentacion = await mostrarSegmentacionCommand.execute();

//         console.log(ultimaSegmentacion);

//         res.json(ultimaSegmentacion);

//     } catch(error) {
//         next(error);
//     }
// }

module.exports = {
    crearSegmentacion: crearSegmentacion,
    // mostrarSegmentacion: mostrarSegmentacion
}