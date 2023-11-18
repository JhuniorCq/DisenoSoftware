const pool = require('../db');


//Controladores de Prueba, los OFICIALES tendrá su archivo por separada cada uno
const holaMundito = async (req, res, next) => {
    try {
        res.send("Hola Mundo");
    }
    catch (error) {
        next(error);
    }
}

const obtenerTodasTareas = async (req, res, next) => {
    try{
        const resultado = await pool.query('SELECT * FROM task');
        res.json(resultado.rows);
    }catch (error){
        next(error);
    }
};

const obtenerUnaTarea = async (req, res, next) => {
    try {
        const {id} = req.params;

        const resultado = await pool.query('SELECT * FROM task WHERE id = $1', [id]);

        console.log(resultado);

        if(resultado.rows.length === 0){
            return res.status(404).json({
                message: "Tarea NO encontrada"
            });
        }

        console.log(id);

        res.json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
};

const crearTarea = async (req, res, next) => {
    const {titulo, descripcion} = req.body;

    try{
        const result = await pool.query('INSERT INTO task (titulo, descripcion) VALUES ($1, $2) RETURNING *', [
            titulo,
            descripcion
        ]);

        console.log(result);
        res.json(result.rows[0]);
    }
    catch(error){
        next(error);
    }
};

const eliminarTarea = async (req, res, next) => {
    try {   
        const {id} = req.params;
        
        const resultado = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
        
        if(resultado.rowCount === 0){
            return res.status(404).json({
                message: "Tarea NO encontrada"
            });
        }

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const modificarTarea = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {titulo, descripcion} = req.body;

        const resultado = await pool.query('UPDATE task SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *',[titulo, descripcion, id]);

        if(resultado.rows.length === 0){
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

module.exports = {
    //Exportaciones de Prueba
    obtenerTodasTareas: obtenerTodasTareas,
    obtenerUnaTarea: obtenerUnaTarea,
    crearTarea: crearTarea,
    eliminarTarea: eliminarTarea,
    modificarTarea: modificarTarea,
    holaMundito: holaMundito
}