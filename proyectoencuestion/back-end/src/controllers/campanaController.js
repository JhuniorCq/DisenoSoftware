const {CampanaRepository} = require('../repository/campanaRepository');
const campanaRepository = new CampanaRepository;

const crearCampana = async (req, res, next) => {
    try {

        const campana = req.body;
        const result = await campanaRepository.crearCampana(campana);

        console.log(result);
        res.json(result);

    } catch (error) {
        next(error)
    }
}

module.exports = {
    crearCampana: crearCampana
}