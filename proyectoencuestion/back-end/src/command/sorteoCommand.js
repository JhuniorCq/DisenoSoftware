
class CrearMensajeSorteoCommand {
    constructor(sorteoService) {
        this.sorteoService = sorteoService;
    }

    execute(sorteoData) {
        return this.sorteoService.crearMensajeSorteo(sorteoData);
    }
}

module.exports = {
    CrearMensajeSorteoCommand: CrearMensajeSorteoCommand
}