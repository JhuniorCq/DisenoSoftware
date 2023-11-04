//Acá pondremos a todas las Funciones Flecha que son el Segundo Parámetro cuando se hacen las RUTAS

//Importamos la conexión a la base de datos, es decir traemos a 'pool'
const pool = require('../db');

const holaMundito = async (req, res, next) => {
    try {
        res.send("Hola Mundoooooooooooooooooo :D");
    }
    catch (err) {
        next(error);
    }
}

const obtenerTodasTareas = async (req, res) => {//Solicitud para obtener algo (response)

    try{
        const resultado = await pool.query('SELECT * FROM task');   //Con esto OBTENDREMOS lo que está siendo guardado en la Base de Datos
        res.json(resultado.rows);   //Con esto convertiremos en un JSON todo lo que está siendo guardado en la BD, para luego mostrarselo al Cliente
    }catch (error){
        next(error);
    }
    /*
    //EJEMPLO PARA SOLICITAR ALGO A LA BD (SOLICITUD SQL)
    //Solicitamos una acción en la BD y la guardamos
    const result = await pool.query('SELECT NOW()');//La solicitud a la BD es asíncrona: async await
    console.log(result);
    //res.json(result.rows[0].now);//Respondemos a la solicitud del Cliente con un json*/
};

const obtenerUnaTarea = async (req, res, next) => {    //Solicitud para Obener algo en específico (response)

    try {
        const {id} = req.params;//El req.params es un Objeto que contiene el VALOR que yo le ponga luego del 'tasks' http://localhost:3000/tasks/"Este valor"

        const resultado = await pool.query('SELECT * FROM task WHERE id = $1', [id]);//Con esto le estoy diciendo a la BD que solo quiero OBTENER la información que tenga el ID indicado

        console.log(resultado);

        if(resultado.rows.length === 0){//Esto es en caso NO se encuentre el ID de la tarea que queremos
            return res.status(404).json({
                message: "Tarea NO encontrada"
            });
        }

        console.log(id);//Con esto pruebo que el ID dentro del req.params si contiene a lo que SE PONGA luego del /tasks/...

        res.json(resultado.rows[0]);//Con esto imprimo los datos de la TAREA
    } catch (error) {
        next(error);
    }
};

const crearTarea = async (req, res, next) => {   //Crear algo (response)
    const {titulo, descripcion} = req.body; //Esto nos permite conocer la información que nos envía el cliente

    //INSERTAR DATOS en la tabla 'task' de la BD
    //Dentro de los primeros () indico los parámetros a los cuales se les dará un valor, el orden de estos parámetros coincidirá con el orden de las colummnas -> cuando los parametros tengan un valor, serán enviados a la BD
    //Luego indico los valores para cada Columna con VALUES
    // $1 y $2-> Coger valor del 1er y 2do elemento del Array, y se colocan a los parametros correspondientes
    //RETURNING * -> Esto hace que luego de la consulta me retorne a la variable 'result' todos los campos que han sido insertados
    try{
        const result = await pool.query('INSERT INTO task (titulo, descripcion) VALUES ($1, $2) RETURNING *', [
            titulo,
            descripcion
        ]);

        console.log(result);
        res.json(result.rows[0]);
        // res.send('Creando una nueva tarea');
    }
    catch(error){
        //DURANTE DESARROLLO: Enviar este mensaje para nosotros saber qué pasa
        next(error);
        //EN PRODUCCIÓN: Enviar un mensaje de error simple
        // throw err;
    }
};

const eliminarTarea = async (req, res, next) => {  //Eliminar una Cosa (response)
    try {
        const {id} = req.params;
        
        //Si no pongo el WHERE id = $1 , se haría un DELETE pero hacia TODA la tabla
        //Con el RETURNING * hago que se agregue en la Impresión la fila ELIMINADA
        const resultado = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]); //Con esto le indico a la BD que elimina la tarea que tenga el ID que le estoy indicando
        
        if(resultado.rowCount === 0){   //Validación en caso NO se encuentre la Tarea, si rowCount es 0, quiere decir que NO hay tarea para ELIMINAR
            return res.status(404).json({
                message: "Tarea NO encontrada"
            });
        }

        // console.log(resultado); //Imprimo el contenido de 'resultado'

        // console.log(`Eliminando la Tarea con ID ${id}`);
        // res.send(`Eliminando la Tarea con ID ${id}`); //Envío mensaje al Cliente indicando que se eliminó la Tarea con ese ID

        return res.sendStatus(204);//Con esto le indico al Cliente que todo salió bien, pero que NO se está que DEVUELVE NINGÚN DATO
    } catch (error) {
        next(error);
    }
}

const modificarTarea = async (req, res, next) => {   //Modificar algo (response)
    try {
        const {id} = req.params;
        const {titulo, descripcion} = req.body;

        const resultado = await pool.query('UPDATE task SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *',[titulo, descripcion, id]);

        if(resultado.rows.length === 0){
            // Para la Validación puedo usar resultado.rowCount o resultado.rows.length , en este caso usaré la segunda opción solo para aprovechar el RETURNING
            return res.status(404).json({
                message: "Tarea NO encontrada"
            });
        }

        console.log(resultado);

        return res.json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
};

//En este archivo JS voy a EXPORTAR varias funciones, por eso haré lo siguiente:
module.exports = {
    obtenerTodasTareas: obtenerTodasTareas,
    obtenerUnaTarea: obtenerUnaTarea,
    crearTarea: crearTarea,
    eliminarTarea: eliminarTarea,
    modificarTarea: modificarTarea,
    holaMundito: holaMundito
}