const {EliminarCampanaRepository} = require('../repository/eliminarCampanaRepository');
const eliminarCampanaRepository = new EliminarCampanaRepository();

class EliminarCampanaService {
    async eliminarCampana(id_campana) {
        //Validación de los Datos


        //
        const result = await eliminarCampanaRepository.eliminarCampana(id_campana);

        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Campaña no encontrada."
            });
        }

        return result;
    }
}

module.exports = {
    EliminarCampanaService: EliminarCampanaService
}