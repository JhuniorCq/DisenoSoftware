const axios = require('axios');
const {LlamadaRepository} = require('../repository/llamadaRepository');
const {ClienteRepository} = require('../repository/clienteRepository');
const llamadaRepository = new LlamadaRepository();
const clienteRepository = new ClienteRepository();

class LlamadaService{
    async crearLlamada(llamadaData){

        const result = llamadaRepository.crearLlamada(llamadaData);

        return result;
    }

    async mostrarLlamadasAdministrar(){

        const datosCampanasLLamada = await llamadaRepository.mostrarLlamadasAdministrar();

        for(const campanaLlamada of datosCampanasLLamada) {
            // const campana_id = campanaLlamada.campana_id;

            campanaLlamada.numero = 'Sin número';
            // const responseCliente = await axios.get(`https://modulo-marketing.onrender.com/obtenerClientesSegmentados/${campana_id}`);//Obtengo correo, nombre, apellido,numero pero de un solo cliente
            // const datosUnCliente = responseCliente.data;
        }

        return datosCampanasLLamada;
    }
}

module.exports = {
    LlamadaService: LlamadaService
}