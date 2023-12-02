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

    async realizarSorteo(sorteoData) {
        try {
            const {campana_id, cantidad_ganadores} = sorteoData;

            const cam_sorteo_id = await sorteoRepository.realizarSorteo(sorteoData);//DEBO HACER CON ESTO QUE SE GUARDE cantidad_ganadores EN LA BD
            
            const responseClientesSegmentados = await axios.get(`https://modulo-marketing.onrender.com/obtenerClientesSegmentados/${campana_id}`);
            const datosClientesSegmentados = responseClientesSegmentados.data;//ME DEVUELVE UN ARRAY DE OBJETOS

            const ganadores = this.obtenerGanadores(datosClientesSegmentados, cantidad_ganadores);// ganadores -> ARRAY DE OBJETOS DE LOS GANADORES

            const result2 = await sorteoRepository.guardarGanadores(ganadores, cam_sorteo_id);

            return ganadores;

        } catch(error) {
            throw console.error('Error en realizarSorteo en sorteoService.js', error.message);
        }
    }

    obtenerGanadores(participantes, cantidad_ganadores) {
        const participantesMezclados = participantes.sort(() => Math.random() - 0.5);

        const ganadores = participantesMezclados.slice(0, cantidad_ganadores);

        return ganadores;//Este es un array de los ganadores
    }

}

module.exports = {
    SorteoService: SorteoService
}