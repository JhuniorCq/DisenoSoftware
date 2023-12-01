class CrearLlamadaCommand{
    constructor(llamadaService){
        this.llamadaService = llamadaService;
    }

    execute(llamadaData){
        return this.llamadaService.crearLlamada(llamadaData);
    }
}

class MostrarLlamadasAdministrarCommand{
    constructor(llamadaService){
        this.llamadaService = llamadaService;
    }
    execute(){
        return this.llamadaService.mostrarLlamadasAdministrar();
    }
}

class MostrarClientesCallCenter {
    constructor(llamadaService){
        this.llamadaService = llamadaService;
    }
    execute(){
        return this.llamadaService.mostrarLlamadasAdministrar();
    }
}

module.exports = {
    CrearLlamadaCommand: CrearLlamadaCommand,
    MostrarLlamadasAdministrarCommand: MostrarLlamadasAdministrarCommand
}