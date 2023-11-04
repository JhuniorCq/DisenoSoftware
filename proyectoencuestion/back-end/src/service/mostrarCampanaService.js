const {MostrarCampanaRepository} = require('../repository/mostrarCampanaRepository');
const mostrarCampanaRepository = new MostrarCampanaRepository();

class MostrarCampanaService {
    async mostrarCampana() {
        //Lógica

        //
        const result = await mostrarCampanaRepository.mostrarCampana();

        return result;
    }
}

module.exports = {
    MostrarCampanaService: MostrarCampanaService
}