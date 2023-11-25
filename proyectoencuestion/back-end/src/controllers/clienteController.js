//ESTO ES PARA TRAER ACÁ LOS DATOS DE LOS CLIENTES DEL MÓDULO DE CLIENTES
const axios = require('axios');
const {ClienteRepository} = require('../repository/clienteRepository');
const clienteRepository = new ClienteRepository();

const obtenerClientes = async (req, res, next) => {
    try {
        // Realiza una solicitud a la API externa para obtener datos de clientes
        const response = await axios.get('https://clientemodulocrm.onrender.com/clientes');
        const clientes = response.data;

        console.log(clientes);

        res.json(clientes);
    } catch(error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });    
    }
}

const obtenerClienteDNI = async (req, res, next) => {
    try {
        const {dni} = req.params;
        const response = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dni}`);
        const clienteData = response.data;

        console.log(clienteData);

        //DEBERIA HABER UN COMMAND Y SERVICE, PERO POR AHORA SERÁ ASI
        const result = await clienteRepository.guardarDNICliente(clienteData);
        
        console.log(result);

        res.json(clienteData);
    } catch(error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}

//FUNCIONES DE LAS RUTAS PARA SERGIO -> CON DATOS DE CLIENTES - LOCAL
const buscarClientePorDNI = async (req, res, next) => {
    try {

    } catch(error) {
        res.status(500).json({ error: 'No se pudo buscar al cliente ' });
    }
}

module.exports = {
    obtenerClientes: obtenerClientes,
    obtenerClienteDNI: obtenerClienteDNI
}