const pool = require('../db');

class CampanaRepository {
    async crearCampana(campana) {
        const { fecha_inicio, fecha_fin, nombre, tipo_campana, descripcion, objetivos } = campana;
        const result = await pool.query('INSERT INTO campana ("fecha_inicio", "fecha_fin", nombre, "tipo_campana", descripcion, objetivos) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            fecha_inicio, 
            fecha_fin, 
            nombre, 
            tipo_campana, 
            descripcion, 
            objetivos
        ]);

        return result.rows[0];
    }
}

module.exports = {
    CampanaRepository: CampanaRepository
}