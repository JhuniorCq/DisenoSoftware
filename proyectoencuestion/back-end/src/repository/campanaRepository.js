const pool = require('../db');

class CampanaRepository {
    async crearCampana(campana) {
        const { nombre, tipo, fechaInicio, fechaFin, objetivo, tipoSegmentacion, notas } = campana;
        const result = await pool.query('INSERT INTO campana (nombre, tipo, "fechaInicio", "fechaFin", objetivo, "tipoSegmentacion", notas) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            nombre, 
            tipo, 
            fechaInicio, 
            fechaFin, 
            objetivo, 
            tipoSegmentacion, 
            notas
        ]);

        return result.rows[0];
    }
}

module.exports = {
    CampanaRepository: CampanaRepository
}