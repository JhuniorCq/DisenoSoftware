class CrearCampanaCommand {
    constructor(campanaService){
        this.campanaService = campanaService;
    }

    execute(campanaData) {
        return this.campanaService.crearCampana(campanaData);
    }
}

class MostrarCampanaCommand {
    constructor(campanaService){
        this.campanaService = campanaService;
    }

    execute(campanaData){
        return this.campanaService.mostrarCampana(campanaData);
    }
}

class EliminarCampanaCommand {
    constructor(campanaService){
        this.campanaService = campanaService;
    }

    execute(campanaID){
        return this.campanaService.eliminarCampana(campanaID);
    }
}

module.exports = {
    CrearCampanaCommand: CrearCampanaCommand,
    MostrarCampanaCommand: MostrarCampanaCommand,
    EliminarCampanaCommand: EliminarCampanaCommand
}