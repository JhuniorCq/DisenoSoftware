const axios = require('axios');
const {LlamadaRepository} = require('../repository/llamadaRepository');
const {ClienteRepository} = require('../repository/clienteRepository');
// const {ClienteService} = require('../service/clienteService');
const llamadaRepository = new LlamadaRepository();
const clienteRepository = new ClienteRepository();

class LlamadaService{
    async crearLlamada(llamadaData){
        //Validación de Datos

        //Lógica

        //Llamada a LlamadaRepository para que ingrese datos en la BD
        const result = llamadaRepository.crearLlamada(llamadaData);



        

        //ESTO IRIÍA EN OTRA RUTAAAA, LA DE mostrarLlamadasAdministrar EN DONDE SE DEBEERIA PASAR A campana_id COMO PARÉMETRO DE LA RUTA Y LUEGO CON ESO TRAER A LOS CLIENTES QUE TENGAN ESE campana_id Y YA RECIEN HACER EL PATRÓ STATE

        //TODO ESTO NO DEBE IR ACÁ CREO, PORQUE ESTA RUTA SOLO CREARÁ LA LLAMADA -> EL CALLCENTER HARÁ LAS LLAMADAS EN OTRO LADO
        const {campana_id} = llamadaData;

        const dni_y_EstadoClientes = await clienteRepository.traerDNIClientesParaCorreos(campana_id); //TRAE UN ARRAY DE OBJETOS DE CLIENTES (CADA CLIENTE TRAE campana_id, cliente_id, estado) DE LA CAMPAÑA RESPECTIVA

        console.log(dni_y_EstadoClientes);

        for(const datosCliente of dni_y_EstadoClientes) {//CON ESTE BUCLE SE ENVIARÁ EL CORREO A CADA UNO DE LOS CLIENTES

            const cliente_id = datosCliente.cliente_id;
            // ME TRAR UN CLIENTE CUANDO PASO SU DNI
            const responseCliente = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${cliente_id}`);//Obtengo mensaje, fecha_inicio, fecha_fin, hora_inicio, hora_fin
            const datosUnCliente = responseCliente.data;
            console.log(datosUnCliente);//HASTA ACÁ YA TENGO LOS DATOS DE CADA UNO DE LOS CLIENTES PARA ENVIARLES SUS CORREOS
            
            //HACER UN PATRÓN STATE PARA LLAMADAS


        }

        return result;
    }

    async mostrarLlamadasAdministrar(){

        const datosCampanasLLamada = await llamadaRepository.mostrarLlamadasAdministrar();

        return datosCampanasLLamada;
    }
}

module.exports = {
    LlamadaService: LlamadaService
}