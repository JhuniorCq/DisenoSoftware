const axios = require('axios');
const { format } = require('date-fns');
const {ClienteRepository} = require('../repository/clienteRepository');
const clienteRepository = new ClienteRepository();

class ClienteService {

    async buscarClientePorDNI(dniCliente) {
        try {

            if (!/^\d{8}$/.test(dniCliente)) {
                throw new Error('El DNI debe tener 8 dígitos.');//Creo un objeto Error y le paso ese mensaje
            }

            const result = await clienteRepository.buscarClientePorDNI(dniCliente);
            return result;
        } catch(error) {
            throw console.error(error.message);//Así debo manejar los errores, con esto se ejecuta el mensaje de error solamente de esta función
        }
    }

    //AHORA -> CREAR RUTA EN LLAMADAS QUE LLAME EN LA PARTE DE SERVICE A obtenerClientesSegmentados Y DENTRO DEL SERVICE DE LLAMADAS LLAMAR A OTRO LLAMADA REPOSITORY PARA QUE HAGAS ALGUNAS CONSULTAS EN LA BD
    async obtenerClientesSegmentados(campana_id) {
        try {
            const dniClientes = await clienteRepository.obtenerClientesSegmentados(campana_id);

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

                console.log(datosUnCliente);

                datosClientesSegmentados.push(datosUnCliente);
                //HASTA ACÁ YA TENGO LOS DATOS DE CADA UNO DE LOS CLIENTES PARA ENVIARLES SUS CORREOS
            }

            return datosClientesSegmentados;

        } catch(error) {
            throw console.error('Error en el método buscarCampanaPorID en clienteService.js', error.message)
        }
    }

    async filtrarClientes(datosTodosClientes, edadMinima, edadMaxima, rangoFechaInicio, rangoFechaFin, distrito, departamento, sexo, tipo_campanaID) {

        let clientesFiltrados = [];

        try {
            for(const cliente of datosTodosClientes) {

                if(tipo_campanaID == 1 || tipo_campanaID == 2) {
                    
                    const cumpleCondicionSexo = sexo === 'A' || cliente.sexo === sexo;
                    
                    // console.log('Realizando la segmentación en filstrarClientes en clienteService');
                    if(edadMinima <= this.calcularEdadCliente(this.formatearFecha(cliente.fechanac)) <= edadMaxima && cliente.distrito === distrito && cliente.departamento === departamento && cumpleCondicionSexo) {

                        clientesFiltrados.push(cliente);
                    }
                } else {

                    const {dni} = datosTodosClientes;

                    const responseVentaCliente = await axios.get(`https://modulo-ventas.onrender.com/getselldni/${dni}`);
                    const datosClienteVenta = responseVentaCliente.data;// ME TRAE LAS VENTAS DE UN CLIENTE -> ARRAY DE OBJETOS

                    datosClienteVenta.forEach((objetoClienteVenta) => {
                        cliente.primera_compra = objetoClienteVenta.fecha;//ANALIZAAAAAAAAAAR
                    });

                    const {fecha} = datosClienteVenta;

                    if(rangoFechaInicio <= cliente.fechaafili <= rangoFechaFin) {//Al medio NO va cliente.fechaafili
                        clientesFiltrados.push(cliente);
                    }
                }
            }

            // if(tipo_campanaID == 1 || tipo_campanaID == 2) {

            //     for(const cliente of datosTodosClientes) {
            //         const cumpleCondicionSexo = 'A' === sexo || cliente.sexo === sexo;

            //         if(edadMinima <= this.calcularEdadCliente(this.formatearFecha(cliente.fechanac)) <= edadMaxima && cliente.distrito === distrito && cliente.departamento === departamento && cumpleCondicionSexo) {

            //             clientesFiltrados.push(cliente);
            //         }
            //     }

            // } else {
            //     for(const clienteVenta of todosClientesVentas) {

            //     }
            // }


            
            return clientesFiltrados;
        } catch(error) {
            throw console.error('No se ha podido filtrar a los clientes:', error.message);
        }
    }

    extraerDniClientesFiltrados(clientesFiltrados) {
        try {
            let arrayDNI = [];

            for(const cliente of clientesFiltrados) {
                arrayDNI.push(cliente.dni);
            }
            return arrayDNI;
        } catch(error) {
            throw console.error('No se ha podido extrar los DNI de los clientes filtrados: ', error.message);
        }
    }

    calcularEdadCliente(fechaNacimiento) {//Se debe proporcionar la fecha en formato YYYY-MM-DD y en CADENA
        const fechaActual = new Date();

        // const fechaNacimientoDate = new Date(fechaNacimiento);//Esto ya no creo, porque fechaNadimiento ya es un Date

        const diferenciaDeDechas = fechaActual - fechaNacimiento;

        const edad = Math.floor(diferenciaDeDechas / (365.25 * 24 * 60 * 60 * 1000));

        return edad;
    }

    formatearFecha(fecha) {
        const fechaDate = new Date(fecha);
        const formatoDeseado = 'dd/MM/yyyy';
        const fechaFormateada = format(fechaDate, formatoDeseado);
        return fechaFormateada;
    }
}

module.exports = {
    ClienteService: ClienteService
}