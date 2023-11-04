const {EliminarCampanaService} = require('../service/eliminarCampanaService');
const eliminarCampanaService = new EliminarCampanaService();

const eliminarCampana = async (req, res, next) => {
    try {
        const {id} = req.params;

        //Llamamos a eliminarCampanaService que llama a eliminarCampanaRepository que llama a la BD
        await eliminarCampanaService.eliminarCampana(id);

        console.log(`La campaña #${id} ha sido eliminada`); //Para probar que se elimina

        return res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    eliminarCampana: eliminarCampana
}