const {CampanaService} = require('../service/campanaService');
const {CrearCampanaCommand, MostrarCampanasCommand, EliminarCampanaCommand, MostrarTipoCampanaCommand} = require('../command/campanaCommand');
const campanaService = new CampanaService();

//Decirla a Enzo que los inputs en CREAR CAMPAÑA sean los que se ponen en la desestructuración de campanaData
const crearCampana = async (req, res, next) => {
    try {
        const crearCampanaCommand = new CrearCampanaCommand(campanaService);
        
        const campanaData = req.body;

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

module.exports = {
    crearCampana: crearCampana,
    mostrarCampanas: mostrarCampanas,
    eliminarCampana: eliminarCampana,
    mostrarTipoCampana: mostrarTipoCampana
}