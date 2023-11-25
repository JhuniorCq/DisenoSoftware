const { Router } = require('express');
const router = Router();

const {iniciarSesion} = require('../controllers/inicioSesionController');
const {crearCampana, mostrarCampanas, eliminarCampana, mostrarTipoCampana, mostrarCampanasEsteMes, mostrarCampanasRecientes, mostrarCampanasCorreo, mostrarCampanasLlamada, mostrarCampanasSorteo, buscarCampanaPorID} = require('../controllers/campanaController');
const {crearCorreo, mostrarCorreos, enviarCorreos} = require('../controllers/correoController');
const {crearLlamada, mostrarLlamadas} = require('../controllers/llamadaController');
const {crearSegmentacion/*, mostrarSegmentacion*/} = require('../controllers/segmentacionController');
const {buscarPromocionPorID} = require('../controllers/promocionController');

const {obtenerClientes, obtenerClienteDNI} = require('../controllers/clienteController');

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
router.get('/mostrarCorreos', mostrarCorreos);
router.get('/enviarCorreos', enviarCorreos);//Ruta nueva

//RUTAS PARA EL APARTADO DE LLAMADAS
router.post('/crearLlamada', crearLlamada);
router.get('/mostrarLlamadas', mostrarLlamadas);

//RUTAS PARA LA SEGMENTACIÓN
router.post('/crearSegmentacion', crearSegmentacion);//YA NO LA USAREMOS CREO
// router.get('/mostrarSegmentacion', mostrarSegmentacion); //Lo puedo Descomentar si quiero mostrar como un response a los datos de una o todas las Segmentaciones
        
//RUTAS PARA LA PROMOCIÓN (DESCUENTO) -> SERGIO
router.get('/buscarCampanaPorID/:idCampana', buscarCampanaPorID);
router.get('/buscarPromocionPorID/:idPromocion', buscarPromocionPorID);

//OBTENER CLIENTES -> MÓDULO CLIENTES
router.post('/clientes', obtenerClientes);
router.post('/clientes/buscarPorDNI/:dni', obtenerClienteDNI);

// //
// router.get('/clientesPorCampana');
// // Por si quiero mostrar los cliente de Joaquin
// const response = await axios.get('/rutaDeJoaquin');
// const arrayClientes = response.data;


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
