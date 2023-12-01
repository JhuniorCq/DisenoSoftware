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

    //SI QUIERO QUE DEVUELVA EL ESTADO, DEBE EL FRONT PONER ALGO PARA CAMBIAR ENTRE ESTADOS Y CUANDO SE PRESIONE ESO SE TIENE QUE DEVOLVER AL BACKEND EL campana_id DE LA CAMPAÑA QUE CONTIENE AL CONJUNTO DE DATOS PARA LAS LLAMADAS -> LUEGO APLICAR EL PATRÓN STATE ACÁ
    async mostrarLlamadasAdministrar(campana_id){//ESTO NO SE USA CREO

        const dniClientes = await clienteRepository.obtenerClientesSegmentados(campana_id);

        //TAMOOOOOS EN LLAMADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS
        const datosClientesSegmentados = [];
        //AGREGAR DATOS DEL CLIENTE DE LA RUTA DE JOAQUIN A MI dniClientes, LUEGO AGREGAR EL NUMERO DEL CLIENTE CON LA RUTA DE SERGIO
        for(const datosCliente of dniClientes) {

            const cliente_id = datosCliente.cliente_id;
            const responseCliente = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${cliente_id}`);
            const datosUnCliente = responseCliente.data;//Obtengo correo, nombre, apellido, DE UN SOLO CLIENTE -> COMO ES "FOR" OBTENGO DE VARIOS CLIENTES
            // console.log(datosUnCliente);

            const responseCliente2 = await axios.get(`https://modulo-ventas.onrender.com/getlineas/${cliente_id}`);//SI ME BOTA NULL O UN OBJETO VACÍO QUIERE DECIR QUE ESE CLIENTE (DNI) NO TIENE UNA LÍNEA ASOCIADA
            const datosUnCliente2 = responseCliente2.data;
            // console.log(datosUnCliente2);

            if(datosUnCliente2 === null) {
                datosUnCliente.numero = 'Sin número';
            } else {
                const numero = datosUnCliente2[0].numero;//SACO EL NÚMERO DE LOS CLIENTES (ESTOS NUMEROS VIENEN DE LA URL DE LINEAS)
                datosUnCliente.numero = numero;//METO EL NÚEMERO JUNTO CON LOS DEMÁS DATOS DE LOS CLIENTES
            }

            datosClientesSegmentados.push(datosUnCliente);
        }

        // datosClientesSegmentados.campana_id = campana_id;

        datosClientesSegmentados.forEach((objetoDatosUnCliente) => {
            objetoDatosUnCliente.campana_id = campana_id;
        })

        const datosUnaCampanaLLamada = await llamadaRepository.mostrarLlamadasAdministrar(campana_id);
        const {mensaje, fecha_inicio, fecha_fin, hora_inicio, hora_fin} = datosUnaCampanaLLamada;

        
        datosClientesSegmentados.forEach((objetoDatosUnCliente) => {
            objetoDatosUnCliente.mensaje = mensaje;
            objetoDatosUnCliente.fecha_inicio = fecha_inicio;
            objetoDatosUnCliente.fecha_fin = fecha_fin;
            objetoDatosUnCliente.hora_inicio = hora_inicio;
            objetoDatosUnCliente.hora_fin = hora_fin;
        })

        console.log(datosUnaCampanaLLamada);

        return datosClientesSegmentados;
    }
}

module.exports = {
    LlamadaService: LlamadaService
}