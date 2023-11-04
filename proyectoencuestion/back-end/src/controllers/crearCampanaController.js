const {CrearCampanaService} = require('../service/crearCampanaService');
const crearCampanaService = new CrearCampanaService();

const crearCampana = async (req, res, next) => {
    try {
        const campanaData = req.body;

        //Llamo a crearCampanaService que llamará a crearCampanaRepository que llamará a la BD
        const result = await crearCampanaService.crearCampana(campanaData);

        console.log(result);
        res.json(result);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    crearCampana: crearCampana
}