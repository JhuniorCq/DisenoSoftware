const pool = require('../db');

class CorreoRepository {
    async crearCorreo(correoData) {
        try{
            const {} = correoData;

            const result = await pool.query('INSERT INTO cam_correo () VALUES () RETURNING *', [
                
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
}

module.exports = {
    CorreoRepository: CorreoRepository
}