
class BuscarPromocionPorIDCommand {
    constructor(promocionService) {
        this.promocionService = promocionService;
    }

    execute(idPromocion) {
        return this.promocionService.buscarPromocionPorID(idPromocion);
    }
}

module.exports = {
    BuscarPromocionPorIDCommand: BuscarPromocionPorIDCommand
}
