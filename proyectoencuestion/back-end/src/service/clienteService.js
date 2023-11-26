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

    filtrarClientes(datosTodosClientes, edadMinima, edadMaxima, rangoFechaInicio, rangoFechaFin, distrito, departamento, sexo, tipo_campanaID) {

        let clientesFiltrados = [];

        try {
            for(const cliente of datosTodosClientes) {

                if(tipo_campanaID == 1 || tipo_campanaID == 2) {
                    
                    const cumpleCondicionSexo = sexo === 'Ambos' || cliente.sexo === sexo;

                    if(edadMinima <= this.calcularEdadCliente(this.formatearFecha(cliente.fechanac)) <= edadMaxima && cliente.distrito === distrito && cliente.departamento === departamento && cumpleCondicionSexo) {
                        clientesFiltrados.push(cliente);
                    }
                } else {
                    if(rangoFechaInicio <= cliente.fechaafili <= rangoFechaFin) {
                        clientesFiltrados.push(cliente);
                    }
                }
            }
            
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