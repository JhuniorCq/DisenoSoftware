class CrearSegmentacionCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute(segmentacionData) {
        return this.campanaService.crearSegmentacion(segmentacionData);
    }
}

module.exports = {
    CrearSegmentacionCommand: CrearSegmentacionCommand
}