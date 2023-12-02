const {BuscarPromocionPorIDCommand, ModificarEstadoPromocionCommand} = require('../command/promocionCommand');
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
        next(error);
    }
}

const modificarEstadoPromocion = async (req, res, next) => {
    try {
        const {promocion_id} = req.params;
        const modificarEstadoPromocionCommand = new ModificarEstadoPromocionCommand(promocionService);
        const result = await modificarEstadoPromocionCommand.execute(promocion_id)

        res.send(`Se han modificado ${result} filas -> El estado de la promoción #${promocion_id}`);
    } catch(error) {
        next(error);
    }
}

module.exports = {
    buscarPromocionPorID: buscarPromocionPorID,
    modificarEstadoPromocion: modificarEstadoPromocion
}