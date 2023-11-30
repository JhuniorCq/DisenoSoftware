const pool = require('../db');

class CorreoRepository {
    async crearCorreo(correoData) {
        try {
            
            const {campana_id, mensaje, fecha_envio, hora, titulo, asunto} = correoData;

            const datosDelCorreo = await pool.query('INSERT INTO cam_correo (campana_id, mensaje, fecha_envio, hora, titulo, asunto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
                campana_id,
                mensaje,
                fecha_envio,
                hora,
                titulo,
                asunto
            ])

            return datosDelCorreo.rows[0];

        } catch (error) {
            throw console.error('No se ha podido guardar los datos de los correos', error.message);
        }
    }

    async mostrarCorreos() {
        try{

            const result = await pool.query('SELECT * FROM cam_correo');
            return result.rows;

        } catch(error){
            throw error;
        }
    }

}

module.exports = {
    CorreoRepository: CorreoRepository
}