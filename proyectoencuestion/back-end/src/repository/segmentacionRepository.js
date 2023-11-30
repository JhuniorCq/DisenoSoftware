const pool = require('../db');

class SegmentacionRepository {
    async crearSegmentacion(segmentacionData) {
        try {
            const {minm, maxm, fechaInicio, fechaFin, distrito, departamento, sexo} = segmentacionData;

            const result = await pool.query('INSERT INTO criterios_segmentacion (minm, maxm, "fecha_inicio", "fecha_fin", distrito, departamento, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
                minm,
                maxm,
                fechaInicio,
                fechaFin,
                distrito,
                departamento,
                sexo
            ]);

            console.log(result.rows[0]);

            return result.rows[0];

        } catch(error) {
            throw error;
        }
    }


    async buscarSegmentacionPorID(segmentacion_id) {
        try {
            // const query = 'SELECT * FROM criterios_segmentacion WHERE segmentacion_id = $1';
            const result = await pool.query('SELECT * FROM criterios_segmentacion WHERE segmentacion_id = $1', [segmentacion_id]);
            
            return result.rows[0];
        } catch(error) {
            throw console.error('Error al buscar la segmentación con segmentación_id', error.message)
        }
    }

    //Esto lo puedo manejar sin que tenga una ruta, ya que solo llamo a esta funcion en campanaService, pero no se usa la ruta
    async mostrarUltimaSegmentacion() {//Muestra la última segmentación guardada
        try {
            const result = await pool.query('SELECT * FROM criterios_segmentacion');
            const ultimaSegmentacion = result.rows[result.rows.length - 1]

            return ultimaSegmentacion;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    SegmentacionRepository: SegmentacionRepository
}