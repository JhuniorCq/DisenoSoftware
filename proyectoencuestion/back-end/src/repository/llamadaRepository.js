const pool = require('../db');

class LlamadaRepository{

    async crearLlamada(llamadaData){
        try{
            const {} = llamadaData;

            const result = await pool.query('INSER INTO cam_llamada () VALUES () RETURNING *', [
    
            ]);
            return result.rows[0];

        } catch(error){
            throw error;
        }
    }

    async mostrarLlamadas(){
        try{
            const result = await pool.query('SELECT * FROM cam_llamada');
            return result.rows;
        } catch(error){
            throw error;
        }
    }
}

module.exports = {
    LlamadaRepository: LlamadaRepository
}