const axios = require('axios');
const {CorreoRepository} = require('../repository/correoRepository');
const {ClienteRepository} = require('../repository/clienteRepository');
const {Correo} = require('../service/state/estadoCorreo');
const correoRepository = new CorreoRepository();
const clienteRepository = new ClienteRepository();

class CorreoService {
    async crearCorreo(correoData){
        try{//PARA ESTE ENTONCES EN EL FRONT SOLO SE DEBEN MOSTRAR CAMPAÑAS DEL TIPO CORREO

            //Llamada a correoRepository para meter datos en la BD
            const datosDelCorreo = await correoRepository.crearCorreo(correoData); //correData contiene -> campana_id, mensaje, fecha_envio, hora, titulo, asunto
            
            const {campana_id} = datosDelCorreo;

            const dni_y_EstadoClientes = await clienteRepository.traerDNIClientesParaCorreos(campana_id); //TRAE UN ARRAY DE OBJETOS DE CLIENTES (CADA CLIENTE TRAE campana_id, cliente_id, estado) DE LA CAMPAÑA RESPECTIVA

            console.log(dni_y_EstadoClientes);//iMPRIME campana_id, cliente_id y estado DE LOS CLIENTES QUE TENGAN EL VALOR DE campana_id

            // const {cliente_id} = dni_y_EstadoClientes;

            for(const dni_y_Estado_Un_Cliente of dni_y_EstadoClientes) {//CON ESTE BUCLE SE ENVIARÁ EL CORREO A CADA UNO DE LOS CLIENTES

                // const cliente_id = dni_y_Estado_Un_Cliente.cliente_id;
                const {cliente_id, estado} = dni_y_Estado_Un_Cliente;
                // ME TRAR UN CLIENTE CUANDO PASO SU DNI
                const responseCliente = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${cliente_id}`);//Obtengo correo, nombre, apellido, pero de un solo cliente
                const datosUnCliente = responseCliente.data;
                console.log(datosUnCliente);//HASTA ACÁ YA TENGO LOS DATOS DE CADA UNO DE LOS CLIENTES PARA ENVIARLES SUS CORREOS

                // const result = new Correo(datosDelCorreo, dni_y_EstadoClientes);
                // result.enviar(datosUnCliente);//Estoy mandando los datos de un cliente luego de buscarlo por su DNI en la ruta de Joaquin
                const result = new Correo(datosDelCorreo, estado, datosUnCliente);
                
                result.enviar();
            }

            return datosDelCorreo;

        } catch(error){
            throw console.error('Hay un error en correoService en el método crearCorreo', error.message);
        }
    }

    async mostrarCorreosAdministrar(){
        try{
            

            //Llamada a correoRepository para meter datos en la BD
            const result = await correoRepository.mostrarCorreosAdministrar();
            return result;

        } catch(error){
            throw error;
        }
    }

}

module.exports = {
    CorreoService: CorreoService
}