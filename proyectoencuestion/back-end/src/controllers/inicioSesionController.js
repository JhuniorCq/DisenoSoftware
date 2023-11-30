const {IniciarSesionCommand, ObtenerDNIUsuarioCommand} = require('../command/inicioSesionCommand');
const {InicioSesionService} = require('../service/inicioSesionService');
const inicioSesionService = new(InicioSesionService);

const iniciarSesion = async (req, res, next) => {
    try {
        const iniciarSesionCommand = new IniciarSesionCommand(inicioSesionService);
        
        const iniciarSesionData = req.body;

        //VALIDAR CREDENCIALES
        const result = await iniciarSesionCommand.execute(iniciarSesionData);

        if(result.length === 0) {
            return res.status(401).json({mensaje: 'Credenciales Inválidas'});
        }

        const {id_rol} = iniciarSesionData;

        if(id_rol === 1) {// 1 -> callcenter
            // Redirigir a la vista de Marketing en el Front
            res.json(result);//Le envio el dni, contrasena y id_rol que TRAIGO DE LA BD -> SE ENVIAN SOLO SI LOS DATOS CUMPLEN
        }
        else if(id_rol === 2) {// 2 -> marketing
            // Redirigir a la vista de CallCenter en el Front
            res.json(result);
        }

    } catch(error) {
        next(error);
    }
}

module.exports = {
    iniciarSesion: iniciarSesion
}