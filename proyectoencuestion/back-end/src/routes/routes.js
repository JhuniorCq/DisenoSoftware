const { Router } = require('express');
const router = Router();

const {iniciarSesion} = require('../controllers/inicioSesionController');
const {crearCampana, mostrarCampanas, eliminarCampana, mostrarTipoCampana, mostrarCampanasEsteMes, mostrarCampanasRecientes, mostrarCampanasCorreo, mostrarCampanasLlamada, mostrarCampanasSorteo, buscarCampanaPorID, infoCampana} = require('../controllers/campanaController');
const {crearCorreo, mostrarCorreosAdministrar} = require('../controllers/correoController');
const {crearLlamada, mostrarLlamadasAdministrar, mostrarClientesCallCenter} = require('../controllers/llamadaController');
const {crearSegmentacion} = require('../controllers/segmentacionController');
const {buscarPromocionPorID} = require('../controllers/promocionController');
const {crearMensajeSorteo,realizarSorteo} = require('../controllers/sorteoController')

const {buscarClientePorDNI, obtenerClientesSegmentados} = require('../controllers/clienteController');

//RUTAS PARA EL INICIO DE SESIÓN
router.post('/iniciarSesion', iniciarSesion);

//RUTAS PARA EL APARTADO DE CAMPAÑA
router.post('/crearCampana', crearCampana);
router.get('/mostrarCampanas', mostrarCampanas);
router.get('/mostrarCampanas/este-mes', mostrarCampanasEsteMes);
router.get('/mostrarCampanas/recientes', mostrarCampanasRecientes);
router.delete('/eliminarCampana/:id', eliminarCampana);//Modificar esto o sacarlo
router.get('/mostrarCampanasCorreo', mostrarCampanasCorreo);
router.get('/mostrarCampanasLlamada', mostrarCampanasLlamada);
router.get('/mostrarCampanasSorteo', mostrarCampanasSorteo);

//RUTAS PARA MOSTRAR TIPO DE UNA CAMPAÑA
router.get('/mostrarTipoCampana/:id', mostrarTipoCampana);

//RUTAS PARA EL APARTADO DE CORREOS
router.post('/crearCorreo', crearCorreo);
router.get('/mostrarCorreosAdministrar', mostrarCorreosAdministrar);

//RUTAS PARA EL APARTADO DE LLAMADAS
router.post('/crearLlamada', crearLlamada);
router.get('/mostrarLlamadasAdministrar', mostrarLlamadasAdministrar);
router.get('/mostrarClientesCallCenter/:campana_id', mostrarClientesCallCenter)

//RUTAS PARA LA SEGMENTACIÓN
router.post('/crearSegmentacion', crearSegmentacion);
        
//RUTA PARA TRAER A CLIENTES SEGMENTADOS DE CUALQUIER CAMPAÑA -> Esto gracias al campana_id
router.get('/obtenerClientesSegmentados/:campana_id', obtenerClientesSegmentados);

//RUTAS PARA SORTEOS
router.post('/crearMensajeSorteo', crearMensajeSorteo);
router.post('/realizarSorteo', realizarSorteo);

//RUTAS PARA LA PROMOCIÓN (DESCUENTO) -> SERGIO
router.get('/buscarCampanaPorID/:idCampana', buscarCampanaPorID);
router.get('/buscarPromocionPorID/:idPromocion', buscarPromocionPorID);
router.get('/buscarClientePorDNI/:dniCliente', buscarClientePorDNI);

//RUTA PARA MÓDULO DE AUTOCONSULTAS
router.get('/infoCampana', infoCampana);


//Esto no es del Proyecto
const {
    //Importaciones de Prueba
    obtenerTodasTareas,
    obtenerUnaTarea, 
    crearTarea, 
    eliminarTarea, 
    modificarTarea,
    holaMundito
} = require('../controllers/controller');

//Rutas de Prueba
router.get('/', holaMundito);
router.get('/tasks', obtenerTodasTareas);
router.get('/tasks/:id', obtenerUnaTarea);
router.post('/tasks', crearTarea);
router.delete('/tasks/:id', eliminarTarea);
router.put('/tasks/:id', modificarTarea);
//Hasta acá

module.exports = router;
