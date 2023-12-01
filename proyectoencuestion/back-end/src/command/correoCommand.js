class CrearCorreoCommand {
    constructor(correoService){
        this.correoService = correoService;
    }

    execute(correoData){
        return this.correoService.crearCorreo(correoData);
    }
}

class MostrarCorreosAdministrarCommand {
    constructor(correoService){
        this.correoService = correoService;
    }

    execute(){
        return this.correoService.mostrarCorreosAdministrar();
    }
}

module.exports = {
    CrearCorreoCommand: CrearCorreoCommand,
    MostrarCorreosAdministrarCommand: MostrarCorreosAdministrarCommand
}