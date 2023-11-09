class CrearCampanaCommand {
    constructor(campanaService){
        this.campanaService = campanaService;
    }

    execute(campanaData) {
        return this.campanaService.crearCampana(campanaData);
    }
}

module.exports = {
    CrearCampanaCommand: CrearCampanaCommand
}