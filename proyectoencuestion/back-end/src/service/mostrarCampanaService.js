const {MostrarCampanaRepository} = require('../repository/mostrarCampanaRepository');
const mostrarCampanaRepository = new MostrarCampanaRepository();

class MostrarCampanaService {
    async mostrarCampana() {
        try {
            const result = await mostrarCampanaRepository.mostrarCampana();

            return result;
        } catch(error) {
            throw error;
        }
        
    }
}

module.exports = {
    MostrarCampanaService: MostrarCampanaService
}