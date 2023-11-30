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
            // const resultados = [];
    
            // // Itera sobre cada objeto en el array
            // for (const correoData of correoArray) {
            //     const { titulo, asunto, mensaje, fecha_envio, correo, campana_id } = correoData;
    
            //     // Realiza la inserción en la base de datos para cada objeto
            //     const result = await pool.query(
            //         'INSERT INTO cam_correo (campana_id, titulo, asunto, mensaje, "fecha_envio", correo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            //         [campana_id, titulo, asunto, mensaje, fecha_envio, correo]
            //     );
    
            //     resultados.push(result.rows[0]);

            //     console.log(resultados);
            // }
    
            // return resultados;
        } catch (error) {
            throw console.error('No se ha podido guardar los datos de los correos', error.message);
        }
    }

    // async enviarCorreos() {
    //     try {
            
    //     } catch(error) {
    //         throw console.error('No se ha podido enviar los correos', error.message);
    //     }
    // }
    
    async mostrarCorreos() {
        try{

            const result = await pool.query('SELECT * FROM cam_correo');
            return result.rows;

        } catch(error){
            throw error;
        }
    }



    // async enviarCorreos(correoData) {
    //     try {
    //         const {} = correoData;
    //     } catch(error) {
    //         throw error;
    //     }
    // }
}

module.exports = {
    CorreoRepository: CorreoRepository
}