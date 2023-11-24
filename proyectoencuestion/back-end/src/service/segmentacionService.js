const {SegmentacionRepository} = require('../repository/segmentacionRepository');
const segmentacionRepository = new SegmentacionRepository();

class SegmentacionService {
    async crearSegmentacion(segmentacionData) {
        try {
            //Lógica

            
            //Llamada a Repository para Crear la Segmentacion
            const result = await segmentacionRepository.crearSegmentacion(segmentacionData);

            //Llamada a Repository para Obtener la Segmentacion
            const infoSegmentacion = await segmentacionRepository.mostrarSegmentacion();
            const {segmentacion_id} = infoSegmentacion; //Obtengo solo segmentacion_id de toda la info de la tabla criterios_segmentacion

            return segmentacion_id;
        } catch(error) {
            throw error;
        }
    }

    async mostrarSegmentacion() {
        try {
            const result = await segmentacionRepository.mostrarSegmentacion();
            return result;
        } catch(error) {
            throw error;
        } 
    }
}

module.exports = {
    SegmentacionService: SegmentacionService
}