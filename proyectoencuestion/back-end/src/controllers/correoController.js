const {CorreoService} = require('../service/correoService');
const {CrearCorreoCommand, MostrarCorreosAdministrarCommand} = require('../command/correoCommand');
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

//ESTA RUTA USARÉ PARA MOSTRAR CORREOS Y EL ESTADO -> ADMINISTRAR
const mostrarCorreosAdministrar = async (req, res, next) => {
    try{
        const mostrarCorreosAdministrarCommand = new MostrarCorreosAdministrarCommand(correoService);

        const result = await mostrarCorreosAdministrarCommand.execute();

        res.json(result);

    } catch(error){
        next(error);
    }
}

module.exports = {
    crearCorreo: crearCorreo,
    mostrarCorreosAdministrar: mostrarCorreosAdministrar
}