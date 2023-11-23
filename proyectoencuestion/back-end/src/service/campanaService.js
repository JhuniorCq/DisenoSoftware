const {CampanaRepository} = require('../repository/campanaRepository');
const campanaRepository = new CampanaRepository();

class CampanaService {
    async crearCampana (campanaData) {
        // Validación de los datos -> CREAR CAMPAÑA
        if (!campanaData.fecha_inicio || !campanaData.fecha_fin || !campanaData.nombre || !campanaData.tipo_campana || !campanaData.descripcion || !campanaData.objetivos) {
            throw new Error('Complete todos los campos');
        }

        // Lógica Fechas
        if (campanaData.fecha_inicio > campanaData.fecha_fin) {
            throw new Error('La fecha de inicio no puede ser posterior a la fecha de finalización');
        }

        //PROMOCIÓN
        let promocion_id;// Uso let porque sino tendría que darle un valor acá, y el valor quiero darselo adentro del if
        //Declaro acá afuera a promocion_id porque si lo declaro adentro no podré utilizar la variable fuera del if
        if (campanaData.tipo_campana === '1' || campanaData.tipo_campana === '2') {//Llamada = 1 y Correo = 2
            // Aquí deberías verificar que el campo de descuento esté presente y no sea nulo
            if (campanaData.promocion == null) {
                throw new Error('El campo de descuento es obligatorio para este tipo de campaña');
            }
            // Llamada a crearCampanaRepository para meter datos en la BD
            const promocionData = await campanaRepository.crearPromocion(campanaData);//Asigno a promocionData la info guardada en la tabla promocion

            console.log(promocionData);
            promocion_id = promocionData.promocion_id;//Asigno a promocion_id el valor de la clave promocion_id del objeto promocionData
        }

        //SEGMENTACIÓN
        /*
            - Si quiero que la Segmentación se guarde al mismo tiempo que los demás datos de la campaña debo llamar acá a segmentacionService, y la ruta para la crearSegmentacion quedaría obsoleta
            - Caso Contrario si hago que la segmentacion se guarde al presionar el botón "Guardar" en la segmentación, se mantendría vigente la ruta de crearSegmentación, pero habría un error -> Se termine o no de crear la Campaña igual se guardarían los datos de la segmentación
        */



        // Llamada a crearCampanaRepository para meter datos en la BD -> INGRESAR LOS DEMÁS DATOS DE LA CAMPAÑA A LA BD
        const result = await campanaRepository.crearCampana(campanaData, promocion_id);//Paso como parametro a campanaData y aparte a promocion_id
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

    async mostrarTipoCampana(tipoCampanaID) {
    
        //Llamado a Repository
        const nombreTipoCampana = await campanaRepository.mostrarTipoCampana(tipoCampanaID);
        return nombreTipoCampana;
    }
}

module.exports = {
    CampanaService: CampanaService
}

