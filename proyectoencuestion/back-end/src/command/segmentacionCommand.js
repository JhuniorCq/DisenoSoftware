class CrearSegmentacionCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute(segmentacionData) {
        return this.campanaService.crearSegmentacion(segmentacionData);
    }
}

class MostrarSegmentacionCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute() {
        return this.campanaService.mostrarSegmentacion();
    }
}

module.exports = {
    CrearSegmentacionCommand: CrearSegmentacionCommand,
    MostrarSegmentacionCommand: MostrarSegmentacionCommand
}