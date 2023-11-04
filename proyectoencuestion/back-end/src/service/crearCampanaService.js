const {CampanaRepository} = require('../repository/crearCampanaRepository');
const campanaRepository = new CampanaRepository();

class CampanaService {
    async crearCampana (campanaData) {
        //Validaciones



        //Llamada a la BD
        const result = await campanaRepository.crearCampana(campanaData);
        return result;
    }
}

module.exports = {
    CampanaService: CampanaService
}