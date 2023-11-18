const pool = require('../db');

class CorreoRepository {
    async crearCorreo(correoArray) {
        try {
            const resultados = [];
    
            // Itera sobre cada objeto en el array
            for (const correoData of correoArray) {
                const { titulo, asunto, mensaje, fecha_envio, correo, campana_id } = correoData;
    
                // Realiza la inserción en la base de datos para cada objeto
                const result = await pool.query(
                    'INSERT INTO cam_correo (campana_id, titulo, asunto, mensaje, "fecha_envio", correo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                    [campana_id, titulo, asunto, mensaje, fecha_envio, correo]
                );
    
                resultados.push(result.rows[0]);

                console.log(resultados);
            }
    
            return resultados;
        } catch (error) {
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