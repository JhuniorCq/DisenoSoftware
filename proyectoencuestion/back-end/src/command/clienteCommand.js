

class BuscarClientePorDNICommand {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }

    execute(dniCliente) {
        return this.clienteService.buscarClientePorDNI(dniCliente);
    }
}

module.exports = {
    BuscarClientePorDNICommand: BuscarClientePorDNICommand
}