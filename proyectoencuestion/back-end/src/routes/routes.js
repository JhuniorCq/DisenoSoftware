const { Router } = require('express');
const router = Router();

const {crearCampana, mostrarCampanas, eliminarCampana} = require('../controllers/campanaController');
const {crearCorreo, mostrarCorreos, enviarCorreos} = require('../controllers/correoController');
const {crearLlamada, mostrarLlamadas} = require('../controllers/llamadaController');

//RUTAS PARA EL APARTADO DE CAMPAÑA
router.post('/crearCampana', crearCampana);
router.get('/mostrarCampanas', mostrarCampanas);
router.delete('/eliminarCampana/:id', eliminarCampana);

//RUTAS PARA EL APARTADO DE CORREOS
router.post('/crearCorreo', crearCorreo);
router.get('/mostrarCorreos', mostrarCorreos);
router.get('/enviarCorreos', enviarCorreos);//Ruta nueva

//RUTAS PARA EL APARTADO DE LLAMADAS
router.post('/crearLlamada', crearLlamada);
router.get('/mostrarLlamadas', mostrarLlamadas);

//RUTA PARA LA SEGMENTACIÓN
// router.post('/crearSegmentacion', crearSegmentacion);//CREAR AHORA
// router.get('/mostrarSegmentacion', mostrarSegmentacion);

// //
// router.get('/clientesPorCampana');
//Por si quiero mostrar los cliente de Joaquin
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
