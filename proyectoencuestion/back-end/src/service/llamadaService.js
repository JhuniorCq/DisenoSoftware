const axios = require('axios');
const {LlamadaRepository} = require('../repository/llamadaRepository');
const {ClienteRepository} = require('../repository/clienteRepository');
const llamadaRepository = new LlamadaRepository();
const clienteRepository = new ClienteRepository();

class LlamadaService{
    async crearLlamada(llamadaData){
        //Validación de Datos

        //Lógica

        //Llamada a LlamadaRepository para que ingrese datos en la BD
        const result = llamadaRepository.crearLlamada(llamadaData);



        
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

            // const result = new Correo(datosDelCorreo, dni_y_EstadoClientes);
            // result.enviar(datosUnCliente);//Estoy mandando los datos de un cliente luego de buscarlo por su DNI en la ruta de Joaquin
            // const result = new Correo(datosDelCorreo, dni_y_EstadoClientes, datosUnCliente); -> ESTO ES DE CORREOS :V JEJEJE
            
            // result.enviar();
            
            //HACER UN PATRÓN STATE PARA LLAMADAS


        }

        return result;
    }

    async mostrarLlamadas(){


        const result = llamadaRepository.mostrarLlamadas();
        return result;
    }
}

module.exports = {
    LlamadaService: LlamadaService
}