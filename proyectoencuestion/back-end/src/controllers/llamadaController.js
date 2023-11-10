const {LlamadaService} = require('../service/llamadaService');
const {CrearLlamadaCommand, MostrarLlamadasCommand} = require('../command/llamadaCommand');
const llamadaService = new LlamadaService();

const crearLlamada = async (req, res, next) => {
    try{
        const crearLlamadaCommand = new CrearLlamadaCommand(llamadaService);

        const llamadaData = req.body;
    
        const result = await crearLlamadaCommand.execute(llamadaData);
        
        console.log(result);
        res.json(result);

    } catch(error){{
        next(error);
    }}
}

const mostrarLlamadas = async (req, res, next) => {
    try{
        const mostrarLlamadasCommand = new MostrarLlamadasCommand(llamadaService);
        const result = await mostrarLlamadasCommand.execute();

        console.log(result);
        res.json(result);

    } catch(error){
        next(error);
    }
}

module.exports = {
    crearLlamada: crearLlamada,
    mostrarLlamadas: mostrarLlamadas
}