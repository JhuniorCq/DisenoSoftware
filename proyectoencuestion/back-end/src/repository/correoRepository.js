const { es } = require('date-fns/locale');
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

    async mostrarCorreosAdministrar() {
        try{
            const todosCorreosAdministrar = [];

            const datosTodosCorreos = await pool.query('SELECT * FROM cam_correo');

            for(const datosUnCorreo of datosTodosCorreos.rows) {
                const {campana_id, cam_correo_id, mensaje, fecha_envio, hora, titulo, asunto} = datosUnCorreo;

                // campanaID_CampanasCorreos.push(campana_id);
                const participantesData = await pool.query('SELECT campana_id, cliente_id, estado FROM participante WHERE campana_id = $1', [campana_id]);

                for(const unParticipanteData of participantesData.rows) {
                    unParticipanteData.cam_correo_id = cam_correo_id;
                    unParticipanteData.mensaje = mensaje;
                    unParticipanteData.fecha_envio = fecha_envio;
                    unParticipanteData.hora = hora;
                    unParticipanteData.titulo = titulo;
                    unParticipanteData.asunto = asunto;

                    todosCorreosAdministrar.push(unParticipanteData);
                }
            }

            return todosCorreosAdministrar;

        } catch(error){
            throw error;
        }
    }

}

module.exports = {
    CorreoRepository: CorreoRepository
}