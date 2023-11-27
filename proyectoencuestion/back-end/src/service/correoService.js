const axios = require('axios');
const {CorreoRepository} = require('../repository/correoRepository');
const {ClienteRepository} = require('../repository/clienteRepository');
const {Correo} = require('../service/state/estadoCorreo');
const correoRepository = new CorreoRepository();
const clienteRepository = new ClienteRepository();

class CorreoService {
    async crearCorreo(correoData){
        try{
            //Validación de Datos

            //COORREODATA debe contener campana_id -> Cuando el usuario escoja una de las campañas de tipo correo, se deben mandar al back el ID de esa campaña
            
            // const nuevoCorreo = new Correo(correo, mensaje, fecha_envio);//ESTO ES PARA VER EL ESTADO DEL CORREO, LO HAGO DE AHI
            // nuevoCorreo.enviar();

            //Llamada a correoRepository para meter datos en la BD
            const datosDelCorreo = await correoRepository.crearCorreo(correoData);

            const {campana_id} = datosDelCorreo;

            const datosClientesParaCorreos = await clienteRepository.traerDNIClientesParaCorreos(campana_id); //TRAE UN ARRAY DE OBJETOS DE CLIENTES (CADA CLIENTE TRAE campana_id, cliente_id, estado)

            // const {cliente_id} = datosClientesParaCorreos;

            for(const datosCliente of datosClientesParaCorreos) {//CON ESTE BUCLE SE ENVIARÁ EL CORREO A CADA UNO DE LOS CLIENTES

                const cliente_id = datosCliente.cliente_id;
                const responseCliente = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${cliente_id}`);//Obtengo correo, nombre, apellido, pero de un solo cliente
                const datosUnCliente = responseCliente.data;// ME TRAR UN CLIENTE CUANDO PASO SU DNI
                // console.log(datosUnCliente);//HASTA ACÁ YA TENGO LOS DATOS DE CADA UNO DE LOS CLIENTES PARA ENVIARLES SUS CORREOS

                const result = new Correo(datosDelCorreo, datosClientesParaCorreos);//CREO QUE ACÁ TA EL PROBLEMA :,V
                result.enviar(datosUnCliente);//Estoy mandando los datos de un cliente luego de buscarlo por su DNI en la ruta de Joaquin
            }

            return datosDelCorreo;

        } catch(error){
            throw console.error('Hay un error en correoService en el método crearCorreo', error.message);
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
    // async enviarCorreos(correoData) {
    //     try {
    //         //Validación de Datos

    //         //Lógica de Negocio

    //         //Llamada a correoRepository para meter datos en la BD
    //         const result = await correoRepository.enviarCorreos(correoData);
    //         return result;

    //     } catch(error) {
    //         throw error;
    //     }
    // }
}

module.exports = {
    CorreoService: CorreoService
}