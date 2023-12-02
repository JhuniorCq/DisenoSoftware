const pool = require('../db');

class LlamadaRepository{

    async crearLlamada(llamadaData){
        try{
            const {campana_id, mensaje, fecha_inicio, fecha_fin, hora_inicio, hora_fin} = llamadaData;

            const result = await pool.query('INSERT INTO cam_llamada ("campana_id", mensaje, "fecha_inicio", "fecha_fin", "hora_inicio", "hora_fin") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
                campana_id,
                mensaje,
                fecha_inicio,
                fecha_fin,
                hora_inicio,
                hora_fin
            ]);

            return result.rows[0];//ESTO DEVUELVE campana_id

        } catch(error){
            throw console.error('Error al quere almacenar los datos de llamadaData en la Base de Datos', error.message);
        }
    }


    async mostrarLlamadasAdministrar(){
        try{
            const datosCampanasLLamada = await pool.query('SELECT * FROM cam_llamada');

            // console.log(datosCampanasLLamada.rows);
            return datosCampanasLLamada.rows;
        } catch(error){
            throw error;
        }
    }
}

module.exports = {
    LlamadaRepository: LlamadaRepository
}