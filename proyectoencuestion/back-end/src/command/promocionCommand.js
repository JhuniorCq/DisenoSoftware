
class BuscarPromocionPorIDCommand {
    constructor(promocionService) {
        this.promocionService = promocionService;
    }

    execute(idPromocion) {
        return this.promocionService.buscarPromocionPorID(idPromocion);
    }
}

class ModificarEstadoPromocionCommand {
    constructor(promocionService) {
        this.promocionService = promocionService;
    }

    execute(promocion_id) {
        return this.promocionService.modificarEstadoPromocion(promocion_id);
    }
}

module.exports = {
    BuscarPromocionPorIDCommand: BuscarPromocionPorIDCommand,
    ModificarEstadoPromocionCommand: ModificarEstadoPromocionCommand
}
