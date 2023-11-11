const {CorreoRepository} = require('../repository/correoRepository');
const {Correo} = require('../service/state/estadoCorreo');
const correoRepository = new CorreoRepository;

class CorreoService {
    async crearCorreo(correoData){
        try{
            //Validación de Datos

            //Lógica de Negocio
            const {correo, mensaje, fecha_envio} = correoData;
            const nuevoCorreo = new Correo(correo, mensaje, fecha_envio);
            nuevoCorreo.enviar();

            //Llamada a correoRepository para meter datos en la BD
            const result = await correoRepository.crearCorreo(correoData);
            return result;

        } catch(error){
            throw error;
        }
    }

    async mostrarCorreos(){
        try{
            //Validación de Datos

            //Lógica de Negocio

            //Llamada a correoRepository para meter datos en la BD
            const result = await correoRepository.mostrarCorreos();
            return result;

        } catch(error){
            throw error;
        }
    }

    //Esto ya no será necesario creo
    async enviarCorreos(correoData) {
        try {
            //Validación de Datos

            //Lógica de Negocio

            //Llamada a correoRepository para meter datos en la BD
            const result = await correoRepository.enviarCorreos(correoData);
            return result;

        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    CorreoService: CorreoService
}