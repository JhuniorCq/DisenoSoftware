const { Router } = require('express');
const router = Router();

const {crearCampana, mostrarCampanas, eliminarCampana, mostrarTipoCampana} = require('../controllers/campanaController');
const {crearCorreo, mostrarCorreos, enviarCorreos} = require('../controllers/correoController');
const {crearLlamada, mostrarLlamadas} = require('../controllers/llamadaController');
const {crearSegmentacion, mostrarSegmentacion} = require('../controllers/segmentacionController');
const {buscarPromoDNI, buscarPromo} = require('../controllers/promocionController');

//RUTAS PARA EL APARTADO DE CAMPAÑA
router.post('/crearCampana', crearCampana);
router.get('/mostrarCampanas', mostrarCampanas);
router.delete('/eliminarCampana/:id', eliminarCampana);//Modificar esto o sacarlo

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
router.post('/crearSegmentacion', crearSegmentacion);//CREAR AHORA
router.get('/mostrarSegmentacion', mostrarSegmentacion);
        
//RUTAS PARA LA PROMOCIÓN (DESCUENTO) -> SERGIO
router.get('/buscarPromoDNI', buscarPromoDNI);//Cambiar
router.get('/buscarPromo', buscarPromo);//Cambiar

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
