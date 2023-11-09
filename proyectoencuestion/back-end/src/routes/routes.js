const { Router } = require('express');
// const pool = require('../db');
const router = Router();

const {crearCampana, mostrarCampana, eliminarCampana} = require('../controllers/campanaController');

router.post('/crearCampana', crearCampana);
router.get('/mostrarCampana', mostrarCampana);
router.delete('/eliminarCampana/:id', eliminarCampana);

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
