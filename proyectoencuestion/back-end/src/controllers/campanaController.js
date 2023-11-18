const {CampanaService} = require('../service/campanaService');
const {CrearCampanaCommand, MostrarCampanasCommand, EliminarCampanaCommand} = require('../command/campanaCommand');
const campanaService = new CampanaService();

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

        console.log(result);

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    crearCampana: crearCampana,
    mostrarCampanas: mostrarCampanas,
    eliminarCampana: eliminarCampana
}