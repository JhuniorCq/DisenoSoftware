const {SegmentacionRepository} = require('../repository/segmentacionRepository');
const segmentacionRepository = new SegmentacionRepository();

class SegmentacionService {
    async crearSegmentacion(segmentacionData) {
        try {
            //Lógica

            //Llamada a Repository para Crear la Segmentacion
            const result = await segmentacionRepository.crearSegmentacion(segmentacionData);

            return result;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    SegmentacionService: SegmentacionService
}