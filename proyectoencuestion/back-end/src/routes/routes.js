const { Router } = require('express');
const pool = require('../db');
const router = Router();

const {crearCampana} = require('../controllers/crearCampanaController'); //Importa el Controlador para crearCampana

const {
    //Importaciones de Prueba
    obtenerTodasTareas,
    obtenerUnaTarea, 
    crearTarea, 
    eliminarTarea, 
    modificarTarea,
    holaMundito
} = require('../controllers/controller');

router.post('/crearCampana', crearCampana);

//Rutas de Prueba
router.get('/', holaMundito);
router.get('/tasks', obtenerTodasTareas);
router.get('/tasks/:id', obtenerUnaTarea);
router.post('/tasks', crearTarea);
router.delete('/tasks/:id', eliminarTarea);
router.put('/tasks/:id', modificarTarea);

module.exports = router;
