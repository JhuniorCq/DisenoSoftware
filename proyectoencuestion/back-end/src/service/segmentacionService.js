const {SegmentacionRepository} = require('../repository/segmentacionRepository');
const segmentacionRepository = new SegmentacionRepository();

class SegmentacionService {
    async crearSegmentacion(segmentacionData) {
        try {
            //Lógica

            
            //Llamada a Repository para Crear la Segmentacion
            const result = await segmentacionRepository.crearSegmentacion(segmentacionData);

            //Llamada a Repository para Obtener la Segmentacion
            // const infoSegmentacion = await segmentacionRepository.mostrarSegmentacion();
            // const {segmentacion_id} = infoSegmentacion; //Obtengo solo segmentacion_id de toda la info de la tabla criterios_segmentacion

            return result;
        } catch(error) {
            throw error;
        }
    }

    //Lo puedo Descomentar si quiero mostrar como un response a los datos de una o todas las Segmentaciones, PERO LE TENGO QUE CREAR OTA FUNCIÓN EN SEGMENTACIONREPOSITORY, PARA QUE NO USE LA DE mostrarUltimaSegmentacion

    // async mostrarSegmentacion() {
    //     try {
    //         const ultimaSegmentacion = await segmentacionRepository.mostrarSegmentacion();

    //         return ultimaSegmentacion;
    //     } catch(error) {
    //         throw error;
    //     } 
    // }
}

module.exports = {
    SegmentacionService: SegmentacionService
}