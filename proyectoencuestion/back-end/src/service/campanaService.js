const {format} = require('date-fns');
const {CampanaRepository} = require('../repository/campanaRepository');
const {SegmentacionRepository} = require('../repository/segmentacionRepository');
const campanaRepository = new CampanaRepository();
const segmentacionRepository = new SegmentacionRepository();

class CampanaService {
    async crearCampana (campanaData/*, segmentacion_id*/) {
        // Validación de los datos -> CREAR CAMPAÑA
        if (!campanaData.fecha_inicio || !campanaData.fecha_fin || !campanaData.nombre || !campanaData.tipo_campana || !campanaData.descripcion || !campanaData.objetivos) {
            throw new Error('Complete todos los campos');
        }

        //CREANDO FECHA DE CREACIÓN DE CAMPAÑA (FECHA ACTUAL)
        
        const fechaCreacion = format(new Date(), 'yyyy-MM-dd');
        campanaData.fecha_creacion = fechaCreacion;

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

        //EN EL FRONT EL PRESIONAR EL BOTÓN "PÚBLICO OBJETIVO" Y EL COMPLETAR LOS DATOS DE LA SEGMENTACIÓN  DEBEN SER OBLIGATORIOS, DE LO CONTRARIO SI SE CREA UNA CAMPAÑA SE USARÁN LOS DATOS DE LA ULTIMA SEGMENTACION GUARDADA
        
        //Uso un objeto de SegmentacionRepository para acceder al método de mostrarSegmentacion que me dará la info de la ultima segmentacion guardada
        const ultimaSegmentacion = await segmentacionRepository.mostrarUltimaSegmentacion();
        const {segmentacion_id} = ultimaSegmentacion;

        // Llamada a crearCampanaRepository para meter datos en la BD -> INGRESAR LOS DEMÁS DATOS DE LA CAMPAÑA A LA BD
        const result = await campanaRepository.crearCampana(campanaData, promocion_id, segmentacion_id);//Paso como parametro a campanaData y aparte a promocion_id
        return result;
    }

    async mostrarCampanas() {
        try {
            const todasCampanas = await campanaRepository.mostrarCampanas();

            return todasCampanas;
        } catch(error) {
            throw error;
        }
        
    }

    async mostrarCampanasEsteMes() {
        try {
            const campanasEsteMes = await campanaRepository.mostrarCampanasEsteMes();

            return campanasEsteMes;
        } catch(error) {
            throw error;
        }
    }

    async mostrarCampanasRecientes() {
        try {
            const campanasRecientes = await campanaRepository.mostrarCampanasRecientes();

            return campanasRecientes;
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

    async mostrarCampanasCorreo() {
        try {
            const result = await campanaRepository.mostrarCampanasCorreo();
    
            return result;
        } catch(error) {
            res.status(500).json({ error: 'Ha ocurrido un error' });
        }
    }
    
    async mostrarCampanasLlamada() {
        try {
            const result = await campanaRepository.mostrarCampanasLlamada();

            return result;
        } catch(error) {
            res.status(500).json({ error: 'Ha ocurrido un error' }); 
        }
    }
    
    async mostrarCampanasSorteo() {
        try {
            const result = await campanaRepository.mostrarCampanasSorteo();

            return result;
        } catch(error) {
            res.status(500).json({ error: 'Ha ocurrido un error' });
        }
    }
}

module.exports = {
    CampanaService: CampanaService
}

