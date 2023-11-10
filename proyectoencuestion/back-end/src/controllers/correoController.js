const {CorreoService} = require('../service/correoService');
const {CrearCorreoCommand, MostrarCorreosCommand} = require('../command/correoCommand');
const correoService = new CorreoService();

const crearCorreo = async (req, res, next) => {
    try{
        const crearCorreoCommand = new CrearCorreoCommand(correoService);

        const correoData = req.body;

        const result = await crearCorreoCommand.execute(correoData);

        console.log(result);
        res.json(result);

    } catch(error){
        next(error);
    }
}

const mostrarCorreos = async (req, res, next) => {
    try{
        const mostrarCorreosCommand = new MostrarCorreosCommand(correoService);

        const result = await mostrarCorreosCommand.execute();

        console.log(result);
        res.json(result);

    } catch(error){
        next(error);
    }
}

module.exports = {
    crearCorreo: crearCorreo,
    mostrarCorreos: mostrarCorreos
}