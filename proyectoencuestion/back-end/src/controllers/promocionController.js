const {BuscarPromocionPorIDCommand} = require('../command/promocionCommand');
const {PromocionService} = require('../service/promocionService');
const promocionService = new PromocionService();

//FUNCIONES DE LAS RUTAS PARA SERGIO -> CON DATOS DE CLIENTES - LOCAL
const buscarPromocionPorID = async (req, res, next) => {
    try {
        const buscarPromocionPorIDCommand = new BuscarPromocionPorIDCommand(promocionService);

        const {idPromocion} = req.params;

        const promocion_id = await buscarPromocionPorIDCommand.execute(idPromocion);

        console.log(promocion_id);
        res.json(promocion_id);

    } catch(error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}

module.exports = {
    buscarPromocionPorID: buscarPromocionPorID
}