const {IniciarSesionCommand, ObtenerDNIUsuarioCommand} = require('../command/inicioSesionCommand');
const {InicioSesionService} = require('../service/inicioSesionService');
const inicioSesionService = new(InicioSesionService);

const iniciarSesion = async (req, res, next) => {
    try {
        const iniciarSesionCommand = new IniciarSesionCommand(inicioSesionService);
        
        const iniciarSesionData = req.body;

        //VALIDAR CREDENCIALES
        const result = await iniciarSesionCommand.execute(iniciarSesionData);

        if(!result) {
            return res.status(401).json({mensaje: 'Credenciales Inválidas'});
        }

        const {id_rol} = iniciarSesionData;

        if(id_rol === 1) {// 1 -> callcenter
            // Redirigir a la vista de Marketing en el Front
            res.json({ message: 'Inicio de sesión exitoso - CallCenter'});
        }
        else if(id_rol === 2) {// 2 -> marketing
            // Redirigir a la vista de CallCenter en el Front
            res.json({ message: 'Inicio de sesión exitoso - Marketing'});
        }

    } catch(error) {
        next(error);
    }
}

module.exports = {
    iniciarSesion: iniciarSesion
}