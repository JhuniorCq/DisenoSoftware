class BuscarPromoDNICommand {
    constructor(promocionService) {
        this.promocionService = promocionService;
    }

    execute() {
        return this.promocionService.buscarPromoDNI();
    }
}

class BuscarPromo {
    constructor(promocionService) {
        this.promocionService = promocionService
    }

    execute(promocionService) {
        return this.promocionService.buscarPromo();
    }
}

module.exports = {
    BuscarPromoDNICommand: BuscarPromoDNICommand,
    BuscarPromo: BuscarPromo
}
