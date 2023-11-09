const {MostrarCampanaService} = require('../service/mostrarCampanaService'); //Importar el Service para mostrarCampana
const mostrarCampanaService = new MostrarCampanaService();

const mostrarCampana = async (req, res, next) => {
    try {
        const result = await mostrarCampanaService.mostrarCampana();

        console.log(result);
        res.json(result);
    } catch(error) {
        next(error);
    }
    
}

module.exports = {
    mostrarCampana: mostrarCampana
}