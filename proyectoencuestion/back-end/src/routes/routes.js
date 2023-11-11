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

module.exports = router;
