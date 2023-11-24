const {CampanaService} = require('../service/campanaService');
const {mostrarSegmentacion} = require('../controllers/segmentacionController');
// const {iniciarSesion} = require('../controllers/inicioSesionController');
const {CrearCampanaCommand, MostrarCampanasCommand, EliminarCampanaCommand, MostrarTipoCampanaCommand, MostrarCampanasEsteMesCommand, MostrarCampanasRecientesCommand, MostrarCampanasCorreoCommand, MostrarCampanasLlamadaCommand, MostrarCampanasSorteoCommand} = require('../command/campanaCommand');
const campanaService = new CampanaService();

//Decirla a Enzo que los inputs en CREAR CAMPAÑA sean los que se ponen en la desestructuración de campanaData
const crearCampana = async (req, res, next) => {
    try {
        const crearCampanaCommand = new CrearCampanaCommand(campanaService);
        
        const campanaData = req.body;

        //NO SE PODRÁ TRAER EL DNI CON RES.LOCALS YA QUE EL RES.LOCALS solo tiene un tiempo de vida de 1 Solicitud, IniciarSesion y CrearCampaña son 2 Solicitudes, el res.locals de IniciarSesion muere cuando inicia el de CrearCampaña
        // let {dni} = res.locals;

        // // dni = "12345678";//Probando
        // console.log(dni);

        const result = await crearCampanaCommand.execute(campanaData);

        console.log(result);
        res.json(result);

    } catch (error) {
        next(error);
    }
}

const mostrarCampanas = async (req, res, next) => {
    try {
        const mostrarCampanasCommand = new MostrarCampanasCommand(campanaService);
        const result = await mostrarCampanasCommand.execute();

        console.log(result);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

const mostrarCampanasEsteMes = async (req, res, next) => {
    try {
        const mostrarCampanasEsteMesCommand = new MostrarCampanasEsteMesCommand(campanaService);
        const result = await mostrarCampanasEsteMesCommand.execute();

        console.log(result);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

const mostrarCampanasRecientes = async (req, res, next) => {
    try {

        const mostrarCampanasRecientesCommand = new MostrarCampanasRecientesCommand(campanaService);
        const result = await mostrarCampanasRecientesCommand.execute();

        console.log(result);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

const eliminarCampana = async (req, res, next) => {
    try {
        const eliminarCampanaCommand = new EliminarCampanaCommand(campanaService);

        const {id} = req.params;

        const result = await eliminarCampanaCommand.execute(id);

        console.log(`La campaña #${id} ha sido eliminada`); //Para probar que se elimina

        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Campaña no encontrada."
            });
        }

        console.log(result.rows);

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

//Esta Ruta mostrará los tipos de campaña en los "options" del "select"
const mostrarTipoCampana = async (req, res, next) => {
    try {
        const mostrarTipoCampanaCommand = new MostrarTipoCampanaCommand(campanaService);
        const {id} = req.params;
        
        const nombreTipoCampana = await mostrarTipoCampanaCommand.execute(id);
        console.log(nombreTipoCampana);
        res.send(nombreTipoCampana);

    } catch(error) {
        next(error);
    }
}

const mostrarCampanasCorreo = async (req, res) => {
    try {
        const mostrarCampanasCorreoCommand = new MostrarCampanasCorreoCommand(campanaService);
        const result = await mostrarCampanasCorreoCommand.execute();

        console.log(result);
        res.json(result);
    } catch(error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}

const mostrarCampanasLlamada = async (req, res) => {
    try {
        const mostrarCampanasLlamadaCommand = new MostrarCampanasLlamadaCommand(campanaService);
        const result = await mostrarCampanasLlamadaCommand.execute();

        console.log(result);
        res.json(result);
    } catch(error) {
        res.status(500).json({ error: 'Ha ocurrido un error' }); 
    }
}

const mostrarCampanasSorteo = async (req, res) => {
    try {
        const mostrarCampanasSorteoCommand = new MostrarCampanasSorteoCommand(campanaService);
        const result = await mostrarCampanasSorteoCommand.execute();

        console.log(result);
        res.json(result);
    } catch(error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}

module.exports = {
    crearCampana: crearCampana,
    mostrarCampanas: mostrarCampanas,
    mostrarCampanasEsteMes: mostrarCampanasEsteMes,
    mostrarCampanasRecientes: mostrarCampanasRecientes,
    eliminarCampana: eliminarCampana,
    mostrarTipoCampana: mostrarTipoCampana,
    mostrarCampanasCorreo: mostrarCampanasCorreo,
    mostrarCampanasLlamada: mostrarCampanasLlamada,
    mostrarCampanasSorteo: mostrarCampanasSorteo
}