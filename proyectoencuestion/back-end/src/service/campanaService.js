const {format} = require('date-fns');
const {CampanaRepository} = require('../repository/campanaRepository');
const {SegmentacionRepository} = require('../repository/segmentacionRepository');
const {ClienteRepository} = require('../repository/clienteRepository');
const {ClienteService} = require('../service/clienteService');
const campanaRepository = new CampanaRepository();
const segmentacionRepository = new SegmentacionRepository();
const clienteRepository = new ClienteRepository();
const clienteService = new ClienteService();

class CampanaService {
    async crearCampana (campanaData, datosTodosClientes, datosUnCliente) {
        // Validación de los datos -> CREAR CAMPAÑA
        if (!campanaData.fecha_inicio || !campanaData.fecha_fin || !campanaData.nombre || !campanaData.tipo_campana || !campanaData.descripcion || !campanaData.objetivos) {
            throw new Error('Complete todos los campos');
        }

        //CREANDO FECHA DE CREACIÓN DE CAMPAÑA (FECHA ACTUAL)
        
        // const fechaCreacion = format(new Date(), 'yyyy-MM-dd');
        const fechaCreacion = new Date(); //Cuando ya esté la BD como Date DESCOMENTO esto y lo de arriba lo borro, y la fecha_fin y fecha_inicio lo convierto a Date también
        campanaData.fecha_creacion = fechaCreacion;

        // Lógica Fechas
        if (campanaData.fecha_inicio > campanaData.fecha_fin) {
            throw new Error('La fecha de inicio no puede ser posterior a la fecha de finalización');
        }

        //TIPO CAMPAÑA
        let tipoCampanaInt = parseInt(campanaData.tipo_campana);

        const tipo_campanaID = await campanaRepository.mostrarTipoCampana(tipoCampanaInt);//ID DEL TIPO DE CAMPAÑA -> tipo_campanaID es un entero

        //PROMOCIÓN
        let promocion_id;// Uso let porque sino tendría que darle un valor acá, y el valor quiero darselo adentro del if
        //Declaro acá afuera a promocion_id porque si lo declaro adentro no podré utilizar la variable fuera del if
        if (campanaData.tipo_campana == tipo_campanaID || campanaData.tipo_campana == tipo_campanaID) {//Llamada = 1 y Correo = 2
            // Aquí deberías verificar que el campo de descuento esté presente y no sea nulo
            if (campanaData.promocion == null) {
                throw console.error('El campo de descuento es obligatorio para este tipo de campaña', error.message)
                // throw new Error('El campo de descuento es obligatorio para este tipo de campaña');
            }
            // Llamada a crearCampanaRepository para meter datos en la BD
            const promocionData = await campanaRepository.crearPromocion(campanaData);//Asigno a promocionData la info guardada en la tabla promocion

            // console.log(promocionData);
            promocion_id = promocionData.promocion_id;//Asigno a promocion_id el valor de la clave promocion_id del objeto promocionData
        }

        campanaData.tipo_campana = tipo_campanaID;

        //EN EL FRONT EL PRESIONAR EL BOTÓN "PÚBLICO OBJETIVO" Y EL COMPLETAR LOS DATOS DE LA SEGMENTACIÓN  DEBEN SER OBLIGATORIOS, DE LO CONTRARIO SI SE CREA UNA CAMPAÑA SE USARÁN LOS DATOS DE LA ULTIMA SEGMENTACION GUARDADA

        
        //CHAPO A segmentacion_id DE campanaData (INFO QUE VIENE DEL FRONT)
        const {segmentacion_id} = campanaData;
        const ultimaSegmentacion = await segmentacionRepository.buscarSegmentacionPorID(segmentacion_id);//CAMBIAR POR BUSCAR SEGMENTACION POR ID / PASAR COMO PARAMETRO A segmentacion_id QUE VIENE DE campanaData que manda ENZO
        const {minm: edadMinima, maxm: edadMaxima, fecha_inicio: rangoFechaInicio, fecha_fin: rangoFechaFin, distrito, departamento, sexo} = ultimaSegmentacion;
        
        // Llamada a crearCampanaRepository para meter datos en la BD -> INGRESAR LOS DEMÁS DATOS DE LA CAMPAÑA A LA BD
        const result = await campanaRepository.crearCampana(campanaData, promocion_id, segmentacion_id);//Paso como parametro a campanaData y aparte a promocion_id y a segmentacion_id

        const campana_id = result.campana_id;

        //REALIZAR LA FILTRACIÓN DE CLIENTES
        const clientesFiltrados = clienteService.filtrarClientes(datosTodosClientes, edadMinima, edadMaxima, rangoFechaInicio, rangoFechaFin, distrito, departamento, sexo, tipo_campanaID);//ME TRAE TODOS LOS DATOS DE LOS CLIENTES FILTRADOS

        const dniClientesFiltrados = clienteService.extraerDniClientesFiltrados(clientesFiltrados);//ME TRAE SOLO A LOS DNI DE LOS CLIENTES FILTRADOS

        //ESTE ES UN MENSAJE QUE DICE QUE SE GUARDARON LOS DATOS EN LA TABLA PARTICIPANT
        const mensajeGuardarParticipantes = await clienteRepository.guardarCamposParticipante(campana_id, dniClientesFiltrados);//GUARDA campana_id Y cliente_id -> EL campana_id SE GUARDA EN CADA cliente_id

        console.log(clientesFiltrados);//IMPRIMO TODOS LOS DATOS DE LOS CLIENTES FILTRADOS
        // console.log(dniClientesFiltrados);
        console.log(mensajeGuardarParticipantes);//IMPRIME EL MENSAJE INDICADO QUE SE ALMACENARON LOS DATOS DE LOS PARTICIPANTES EN LA TABLA participante

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

    async buscarCampanaPorID(idCampana) {
        try {
            const campana_id = await campanaRepository.buscarCampanaPorID(idCampana);

            console.log(campana_id);

            return campana_id;
        } catch(error) {
            throw error;
        }
    }

    async infoCampana() {
        try {
            const result = await campanaRepository.infoCampana();

            for(const datos of result) {
                if(datos.tipo_campana === 1) {
                    datos.tipo_campana = 'Campaña - Llamada';
                } else if(datos.tipo_campana === 2) {
                    datos.tipo_campana = 'Campaña - Correo';
                } else if(datos.tipo_campana === 3) {
                    datos.tipo_campana = 'Campaña - Sorteo';
                }
            }

            return result;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    CampanaService: CampanaService
}

