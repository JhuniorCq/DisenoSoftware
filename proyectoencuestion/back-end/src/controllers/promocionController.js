const {BuscarPromoDNICommand, BuscarPromo} = require('../command/promocionCommand');
const {PromocionService} = require('../service/promocionService');
const promocionService = new PromocionService();

const buscarPromoDNI = (req, res, next) => {

    const buscarPromoDNICommand = new BuscarPromoDNICommand(promocionService);

    const {dni_cliente} = req.params;

    const result = buscarPromoDNICommand.execute(dni_cliente);
    
    console.log(result);
    res.json(result);
    
}

const buscarPromo = (req, res, next) => {
    
    const buscarPromo = new BuscarPromo(promocionService);

    const {promocion_id} = req.params;

    const result = buscarPromo.execute(promocion_id);

    console.log(result);
    res.json(result);

}

module.exports = {
    buscarPromoDNI: buscarPromoDNI,
    buscarPromo: buscarPromo
}