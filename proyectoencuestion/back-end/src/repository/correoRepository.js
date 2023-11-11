const pool = require('../db');

class CorreoRepository {
    async crearCorreo(correoData) {
        try{
            const {titulo, asunto, mensaje, fecha_envio, correo} = correoData;

            const result = await pool.query('INSERT INTO cam_correo (titulo, asunto, mensaje, "fecha_envio", correo) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
                titulo,
                asunto,
                mensaje,
                fecha_envio,
                correo
            ]);

            return result.rows[0];

        } catch(error){
            throw error;
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

    async enviarCorreos(correoData) {
        try {
            const {} = correoData;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    CorreoRepository: CorreoRepository
}