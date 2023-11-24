const {InicioSesionRepository} = require('../repository/inicioSesionRepository');
const inicioSesionRepository = new InicioSesionRepository();

class InicioSesionService {
    async iniciarSesion(iniciarSesionData) {
        try {


            const result = await inicioSesionRepository.iniciarSesion(iniciarSesionData);
            return result;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    InicioSesionService: InicioSesionService
}