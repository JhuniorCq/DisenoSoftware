const {CrearMensajeSorteoCommand, RealizarSorteoCommand} = require('../command/sorteoCommand');
const {SorteoService} = require('../service/sorteoService')
const sorteoService = new SorteoService();

const crearMensajeSorteo = async (req, res, next) => {
    try {
        const crearMensajeSorteoCommand = new CrearMensajeSorteoCommand(sorteoService);

        const sorteoData = req.body;//CRISBEL DEBE PASARME campana_id y aparte los datos asunto y mensaje
        // const {campana_id} = sorteoData;

        const result = await crearMensajeSorteoCommand.execute(sorteoData);

        res.json(result);

    } catch(error) {
        next(error);
    }
}

const realizarSorteo = async (req, res, next) => {
    try {
        const sorteoData = req.body;//Esto contiene a campana_id y a cantidad_ganadores

        const realizarSorteoCommand = new RealizarSorteoCommand(sorteoService);

        const ganadores = await realizarSorteoCommand.execute(sorteoData);

        console.log(ganadores);
        res.json(ganadores);

    } catch(error) {
        next(error);
    }
}
module.exports = {
    crearMensajeSorteo: crearMensajeSorteo,
    realizarSorteo: realizarSorteo
}