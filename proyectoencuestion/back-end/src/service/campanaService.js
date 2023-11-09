const {CampanaRepository} = require('../repository/campanaRepository');
const campanaRepository = new CampanaRepository();

class CampanaService {
    async crearCampana (campanaData) {
        //Validación de los datos
        if(!campanaData.fecha_inicio || !campanaData.fecha_fin || !campanaData.nombre || !campanaData.tipo_campana || !campanaData.descripcion || !campanaData.objetivos) {
            throw new Error('Complete todos los campos');
        }

        //Lógica Fechas
        if(campanaData.fecha_inicio > campanaData.fecha_fin) {
            throw new Error('La fecha de inicio no puede ser posterior a la fecha de finalización');
        }

        //Llamada a crearCampanaRepository para meter datos en la BD
        const result = await campanaRepository.crearCampana(campanaData);
        return result;
    }

    async mostrarCampana() {
        try {
            const result = await campanaRepository.mostrarCampana();

            return result;
        } catch(error) {
            throw error;
        }
        
    }

    async eliminarCampana(id_campana) {
        //Validación de los Datos


        //
        const result = await campanaRepository.eliminarCampana(id_campana);

        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Campaña no encontrada."
            });
        }

        return result;
    }
}

module.exports = {
    CampanaService: CampanaService
}

