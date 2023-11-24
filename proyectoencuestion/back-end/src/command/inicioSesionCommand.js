
class IniciarSesionCommand {
    constructor(iniciarSesionService) {
        this.iniciarSesionService = iniciarSesionService;
    }

    execute(iniciarSesionData) {
        return this.iniciarSesionService.iniciarSesion(iniciarSesionData);
    }
}

module.exports = {
    IniciarSesionCommand: IniciarSesionCommand
}