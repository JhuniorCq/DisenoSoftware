class CrearCampanaCommand {
    constructor(campanaService){
        this.campanaService = campanaService;
    }

    execute(campanaData) {
        return this.campanaService.crearCampana(campanaData);
    }
}

class MostrarCampanasCommand {
    constructor(campanaService){
        this.campanaService = campanaService;
    }

    execute(){
        return this.campanaService.mostrarCampanas();
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

class MostrarTipoCampanaCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute() {
        return this.campanaService.mostrarTipoCampana();
    }
}

module.exports = {
    CrearCampanaCommand: CrearCampanaCommand,
    MostrarCampanasCommand: MostrarCampanasCommand,
    EliminarCampanaCommand: EliminarCampanaCommand,
    MostrarTipoCampanaCommand: MostrarTipoCampanaCommand
}