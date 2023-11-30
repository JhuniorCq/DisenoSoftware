

class BuscarClientePorDNICommand {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }

    execute(dniCliente) {
        return this.clienteService.buscarClientePorDNI(dniCliente);
    }
}

class ObtenerClientesSegmentadosCommand {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }

    execute(campana_id) {
        return this.clienteService.obtenerClientesSegmentados(campana_id);
    }
}

module.exports = {
    BuscarClientePorDNICommand: BuscarClientePorDNICommand,
    ObtenerClientesSegmentadosCommand: ObtenerClientesSegmentadosCommand
}