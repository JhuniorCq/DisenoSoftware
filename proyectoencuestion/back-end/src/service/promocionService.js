const {PromocionRepository} = require('../repository/promocionRepository');
const promocionRepository = new PromocionRepository();


class PromocionService {
    async buscarPromoDNI(dni_cliente) {
        try {
            //Lógica

            //Llamado a Repository
            const result = promocionRepository.buscarPromoDNI(dni_cliente);
            return result;

        } catch(error) {
            throw error;
        }
    }

    async buscarPromo(promocion_id) {
        try {
            //Lógica

            //Llamado a Repository
            const result = promocionRepository.buscaPromo(promocion_id);
            return result;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    PromocionService: PromocionService
}


