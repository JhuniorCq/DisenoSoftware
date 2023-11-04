//Importar desde express a la función "Router"
const { Router } = require('express');

//Importamos la conexión a la base de datos, es decir traemos a 'pool'
const pool = require('../db');

//Para usar la función 'Router' lo asignamos a una variable
const router = Router();    //Esto nos permitirá crear nuevas URL (inicialmente está vacía)

//Exportar las Funciones que son 2dos Parámetros al crear una RUTA
const {
    obtenerTodasTareas,
    obtenerUnaTarea, 
    crearTarea, 
    eliminarTarea, 
    modificarTarea,
    holaMundito
} = require('../controllers/controller');

/* 
    - Creando una URL (Ruta) -> Estamos agregando un valor a 'roter' (el contenido de la función flecha)
    - Acá definimos nuestras RUTAS, por ejemplo '/tasks' , esto quiere decir que si accedo a http://localhost:3000/tasks -> se enviará una respuesta a esa RUTA gracias al res.send( )

*/
router.get('/tasks', obtenerTodasTareas);//Solo llamo a la función que ya se definió en controller.js

router.get('/tasks/:id', obtenerUnaTarea);//El :id indica que ahí va un valor, pero aún no sabemos qué valor será. Esto se puede entender como un parámetro v:

router.post('/tasks', crearTarea);

router.delete('/tasks/:id', eliminarTarea);//El :id indica que ahí va un valor, pero aún no sabemos qué valor será. Esto se puede entender como un parámetro v: (Ese id puede tomar cualquier otro nombre v:)

router.put('/tasks/:id', modificarTarea);//El :id indica que ahí va un valor, pero aún no sabemos qué valor será. Esto se puede entender como un parámetro v:

router.get('/', holaMundito);

//Exportamos la variable 'router' que AHORA ya NO está vacía
module.exports = router;
