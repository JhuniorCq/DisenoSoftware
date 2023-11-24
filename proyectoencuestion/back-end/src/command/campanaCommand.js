class CrearCampanaCommand {
    constructor(campanaService){
        this.campanaService = campanaService;
    }

    execute(campanaData, segmentacion_id) {
        return this.campanaService.crearCampana(campanaData, segmentacion_id);
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

class MostrarCampanasEsteMesCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute() {
        return this.campanaService.mostrarCampanasEsteMes();
    }
}

class MostrarCampanasRecientesCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute() {
        return this.campanaService.mostrarCampanasRecientes();
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

    execute(tipoCampanaID) {
        return this.campanaService.mostrarTipoCampana(tipoCampanaID);
    }
}

class MostrarCampanasCorreoCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute() {
        return this.campanaService.mostrarCampanasCorreo();
    }
}

class MostrarCampanasLlamadaCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute() {
        return this.campanaService.mostrarCampanasLlamada();
    }
}

class MostrarCampanasSorteoCommand {
    constructor(campanaService) {
        this.campanaService = campanaService;
    }

    execute() {
        return this.campanaService.mostrarCampanasSorteo();
    }
}

module.exports = {
    CrearCampanaCommand: CrearCampanaCommand,
    MostrarCampanasCommand: MostrarCampanasCommand,
    MostrarCampanasEsteMesCommand: MostrarCampanasEsteMesCommand,
    MostrarCampanasRecientesCommand: MostrarCampanasRecientesCommand,
    EliminarCampanaCommand: EliminarCampanaCommand,
    MostrarTipoCampanaCommand: MostrarTipoCampanaCommand,
    MostrarCampanasCorreoCommand: MostrarCampanasCorreoCommand,
    MostrarCampanasLlamadaCommand: MostrarCampanasLlamadaCommand,
    MostrarCampanasSorteoCommand: MostrarCampanasSorteoCommand
}