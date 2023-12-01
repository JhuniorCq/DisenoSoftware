const {LlamadaService} = require('../service/llamadaService');
const {CrearLlamadaCommand, MostrarLlamadasAdministrarCommand, MostrarClientesCallCenter} = require('../command/llamadaCommand');
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

const mostrarLlamadasAdministrar = async (req, res, next) => {
    try{
        const mostrarLlamadasAdministrarCommand = new MostrarLlamadasAdministrarCommand(llamadaService);
        const result = await mostrarLlamadasAdministrarCommand.execute();

        res.json(result);

    } catch(error){
        next(error);
    }
}

const mostrarClientesCallCenter = async (req, res, next) => {
    try {
        const {campana_id} = req.params;

        const mostrarClientesCallCenter = new MostrarClientesCallCenter(llamadaService);

        const result = await mostrarClientesCallCenter.execute(campana_id);

        res.json(result);

    } catch(error) {
        next(error);
    }
}

module.exports = {
    crearLlamada: crearLlamada,
    mostrarLlamadasAdministrar: mostrarLlamadasAdministrar,
    mostrarClientesCallCenter: mostrarClientesCallCenter
}