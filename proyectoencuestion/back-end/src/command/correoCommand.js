class CrearCorreoCommand {
    constructor(correoService){
        this.correoService = correoService;
    }

    execute(correoData){
        return this.correoService.crearCorreo(correoData);
    }
}

class MostrarCorreosCommand {
    constructor(correoService){
        this.correoService = correoService;
    }

    execute(){
        return this.correoService.mostrarCorreos();
    }
}

class EnviarCorreosCommand {
    constructor(correoService) {
        this.correoService = correoService.enviarCorreos(correoData);
    }

    execute() {
        
    }
}

module.exports = {
    CrearCorreoCommand: CrearCorreoCommand,
    MostrarCorreosCommand: MostrarCorreosCommand,
    EnviarCorreosCommand: EnviarCorreosCommand
}