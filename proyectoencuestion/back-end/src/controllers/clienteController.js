//ESTO ES PARA TRAER ACÁ LOS DATOS DE LOS CLIENTES DEL MÓDULO DE CLIENTES
// const axios = require('axios');
// const {ClienteRepository} = require('../repository/clienteRepository');
// const clienteRepository = new ClienteRepository();
const {ClienteService} = require('../service/clienteService');
const {BuscarClientePorDNICommand, ObtenerClientesSegmentadosCommand} = require('../command//clienteCommand');
const clienteService = new ClienteService();


const buscarClientePorDNI = async (req, res, next) => {
    try {
        const {dniCliente} = req.params;

        const buscarClientePorDNICommand = new BuscarClientePorDNICommand(clienteService);
        const result = await buscarClientePorDNICommand.execute(dniCliente);

        res.json(result);
    } catch(error) {
        next(error);
    }
}

const obtenerClientesSegmentados = async (req, res, next) => {
    try {
        const {campana_id} = req.params;

        const obtenerClientesSegmentadosCommand = new ObtenerClientesSegmentadosCommand(clienteService);

        const result = await obtenerClientesSegmentadosCommand.execute(campana_id);

        // return result;
        res.json(result);

    } catch(error) {
        next(error);
    }
}

module.exports = {
    buscarClientePorDNI: buscarClientePorDNI,
    obtenerClientesSegmentados: obtenerClientesSegmentados
}