const {CrearCampanaRepository} = require('../repository/crearCampanaRepository');
const crearCampanaRepository = new CrearCampanaRepository();

class CrearCampanaService {
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
        const result = await crearCampanaRepository.crearCampana(campanaData);
        return result;
    }
}

module.exports = {
    CrearCampanaService: CrearCampanaService
}