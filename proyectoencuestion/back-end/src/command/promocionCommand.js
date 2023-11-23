class BuscarPromoDNICommand {
    constructor(promocionService) {
        this.promocionService = promocionService;
    }

    execute(dni_cliente) {
        return this.promocionService.buscarPromoDNI(dni_cliente);
    }
}

class BuscarPromo {
    constructor(promocionService) {
        this.promocionService = promocionService
    }

    execute(promocion_id) {
        return this.promocionService.buscarPromo(promocion_id);
    }
}

module.exports = {
    BuscarPromoDNICommand: BuscarPromoDNICommand,
    BuscarPromo: BuscarPromo
}
