const axios = require('axios');
const {enviarCorreosNodemailer} = require('../enviarCorreosNodemailer')
const {SorteoRepository} = require('../repository/sorteoRepository');
const sorteoRepository = new SorteoRepository();

class SorteoService {
    async crearMensajeSorteo(sorteoData) {
        try {
            const {campana_id, asunto, mensaje} = sorteoData;
            //206
            const responseClientesSegmentados = await axios.get(`https://modulo-marketing.onrender.com/obtenerClientesSegmentados/${campana_id}`);
            const datosClientesSegmentados = responseClientesSegmentados.data;//ME DEVUELVE UN ARRAY DE OBJETOS

            const datosMensajeCorreo = await sorteoRepository.crearMensajeSorteo(sorteoData);

            if(datosMensajeCorreo.length > 0) {//Ese datosMensajeCorreo es un Array de un solo objeto, por eso si su tamaño es mayor que 0 se enviarán los correos
                //ACA DEBEN ENVIARSE LOS CORREOS
                
                for(const clienteSegmentado of datosClientesSegmentados) {
                    enviarCorreosNodemailer(clienteSegmentado.correo, asunto, mensaje);
                    console.log(`Correo enviado a ${clienteSegmentado.correo}`);
                }
            }

            return datosMensajeCorreo;

        } catch(error) {
            throw console.error('Error en crearMensajeSorteo en sorteoService.js', error.message);
        }
    }

}

module.exports = {
    SorteoService: SorteoService
}