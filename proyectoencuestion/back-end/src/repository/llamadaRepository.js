const pool = require('../db');

class LlamadaRepository{

    async crearLlamada(llamadaData){
        try{
            const {campana_id, mensaje, fecha_inicio, fecha_fin, hora_inicio, hora_fin} = llamadaData;

            const result = await pool.query('INSER INTO cam_llamada ("campana_id", mensaje, "fecha_inicio", "fecha_fin", "hora_inicio", "hora_fin") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
                campana_id,
                mensaje,
                fecha_inicio,
                fecha_fin,
                hora_inicio,
                hora_fin
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