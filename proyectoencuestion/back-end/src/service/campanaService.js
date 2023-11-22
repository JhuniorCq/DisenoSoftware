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

    async mostrarCampanas() {
        try {
            const result = await campanaRepository.mostrarCampanas();

            return result;
        } catch(error) {
            throw error;
        }
        
    }

    async eliminarCampana(id_campana) {
        //Validación de los Datos


        //
        const result = await campanaRepository.eliminarCampana(id_campana);

        return result;//Acá recién uso el result.rows, porque si lo usaba en Repository no hubiera podido usar result.rowCount
    }

    async mostrarTipoCampana() {
        //Lógica

        //Llamado a Repository
        const result = await campanaRepository.mostrarTipoCampana();
        return result;
    }
}

module.exports = {
    CampanaService: CampanaService
}

