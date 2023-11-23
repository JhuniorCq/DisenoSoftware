const pool = require('../db');

class SegmentacionRepository {
    async crearSegmentacion(segmentacionData) {
        try {
            const {tipo, minm, maxm, fecha_inicio, fecha_fin, distrito, departamento, sexo} = segmentacionData;

            const result = await pool.query('INSERT INTO criterios_segmentacion (tipo, minm, maxm, "fecha_inicio", "fecha_fin", distrito, departamento, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [
                tipo,
                minm,
                maxm,
                fecha_inicio,
                fecha_fin,
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

    async mostrarSegmentacion() {
        try {
            const result = await pool.query('SELECT * FROM criterios_segmentacion');
            // console.log(result.rows);
            return result.rows;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    SegmentacionRepository: SegmentacionRepository
}