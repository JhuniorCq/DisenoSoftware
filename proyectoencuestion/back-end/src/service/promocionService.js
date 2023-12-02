const {PromocionRepository} = require('../repository/promocionRepository');
const promocionRepository = new PromocionRepository();

class PromocionService {

    async buscarPromocionPorID(idPromocion) {
        try {
            //Lógica

            //Llamado a Repository
            const promocion_id = await promocionRepository.buscarPromocionPorID(idPromocion);

            return promocion_id;

        } catch (error) {
            throw error;
        }
    }

    async modificarEstadoPromocion(promocion_id) {
        try {
            const result = await promocionRepository.modificarEstadoPromocion(promocion_id);

            return result;
        } catch(error) {
            throw console.error('Error en modificarEstadoPromocion en promocionService.js', error.message);
        }
    }
}

module.exports = {
    PromocionService: PromocionService
}


