const {CampanaRepository} = require('../repository/crearCampanaRepository');
const {CampanaService} = require('../service/crearCampanaService');
const campanaRepository = new CampanaRepository;
const campanaService = new CampanaService;

const crearCampana = async (req, res, next) => {
    try {
        const campanaData = req.body;

        //Llamo a crearCampanaService que llamará a crearCampanaRepository que llamará a la BD
        const result = await campanaService.crearCampana(campanaData);

        console.log(result);
        res.json(result);

    } catch (error) {
        next(error)
    }
}

module.exports = {
    crearCampana: crearCampana
}