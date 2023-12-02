
class CrearMensajeSorteoCommand {
    constructor(sorteoService) {
        this.sorteoService = sorteoService;
    }

    execute(sorteoData) {
        return this.sorteoService.crearMensajeSorteo(sorteoData);
    }
}

class RealizarSorteoCommand {
    constructor(sorteoService) {
        this.sorteoService = sorteoService;
    }

    execute(sorteoData) {
        return this.sorteoService.realizarSorteo(sorteoData);
    }
}

module.exports = {
    CrearMensajeSorteoCommand: CrearMensajeSorteoCommand,
    RealizarSorteoCommand: RealizarSorteoCommand
}