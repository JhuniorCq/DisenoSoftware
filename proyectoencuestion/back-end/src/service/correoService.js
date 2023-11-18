const {CorreoRepository} = require('../repository/correoRepository');
const correoRepository = new CorreoRepository;

class CorreoService {
    async crearCorreo(correoData){
        try{
            //Validación de Datos

            //Lógica de Negocio

            //Llamada a correoRepository para meter datos en la BD
            const result = await correoRepository.crearCorreo(correoData);
            return result;

        } catch(error){
            throw error;
        }
    }

    async mostrarCorreos(correoData){
        try{

            const result = await correoRepository.mostrarCorreos();
            return result;

        } catch(error){
            throw error;
        }
    }
}

module.exports = {
    CorreoService: CorreoService
}