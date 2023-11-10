const {CampanaService} = require('../service/campanaService');
const {CrearCampanaCommand, MostrarCampanaCommand, EliminarCampanaCommand} = require('../command/campanaCommand');
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

const mostrarCampana = async (req, res, next) => {
    try {
        const mostrarCampanaCommand = new MostrarCampanaCommand(campanaService);
        const result = await mostrarCampanaCommand.execute();

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
    mostrarCampana: mostrarCampana,
    eliminarCampana: eliminarCampana
}