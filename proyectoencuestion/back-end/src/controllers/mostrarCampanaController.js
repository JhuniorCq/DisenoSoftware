const {MostrarCampanaService} = require('../service/mostrarCampanaService'); //Importar el Service para mostrarCampana
const mostrarCampanaService = new MostrarCampanaService();

const mostrarCampana = async (req, res, next) => {
    const result = await mostrarCampanaService.mostrarCampana();

    console.log(result);
    res.json(result);
}

module.exports = {
    mostrarCampana: mostrarCampana
}