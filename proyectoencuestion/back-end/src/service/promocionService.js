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
}

module.exports = {
    PromocionService: PromocionService
}


