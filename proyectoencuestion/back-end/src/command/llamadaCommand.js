class CrearLlamadaCommand{
    constructor(llamadaService){
        this.llamadaService = llamadaService;
    }

    execute(llamadaData){
        return this.llamadaService.crearLlamada(llamadaData);
    }
}

class MostrarLlamadasCommand{
    constructor(llamadaService){
        this.llamadaService = llamadaService;
    }
    execute(){
        return this.llamadaService.mostrarLlamadas();
    }
}

module.exports = {
    CrearLlamadaCommand: CrearLlamadaCommand,
    MostrarLlamadasCommand: MostrarLlamadasCommand
}