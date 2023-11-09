const {CampanaService} = require('../service/campanaService');
const campanaService = new CampanaService();

const {CrearCampanaCommand, MostrarCampanaCommand, EliminarCampanaCommand} = require('../command/campanaCommand');//Probando


const crearCampana = async (req, res, next) => {
    try {
        const crearCampanaCommand = new CrearCampanaCommand(campanaService);//Probando
        
        const campanaData = req.body;

        //Llamo a crearCampanaService que llamará a crearCampanaRepository que llamará a la BD
        // const result = await campanaService.crearCampana(campanaData);

        const result = await crearCampanaCommand.execute(campanaData);//Probando


        console.log(result);
        res.json(result);

    } catch (error) {
        next(error);
    }
}

const mostrarCampana = async (req, res, next) => {
    try {
        const result = await campanaService.mostrarCampana();

        console.log(result);
        res.json(result);
    } catch(error) {
        next(error);
    }
}

const eliminarCampana = async (req, res, next) => {
    try {
        const {id} = req.params;

        //Llamamos a eliminarCampanaService que llama a eliminarCampanaRepository que llama a la BD
        const result = await campanaService.eliminarCampana(id);

        console.log(`La campaña #${id} ha sido eliminada`); //Para probar que se elimina

        return res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    crearCampana: crearCampana,
    mostrarCampana: mostrarCampana,
    eliminarCampana: eliminarCampana
}