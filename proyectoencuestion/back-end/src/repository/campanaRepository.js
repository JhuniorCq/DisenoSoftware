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

    async mostrarCampana() {
        try {
            const result = await pool.query('SELECT * FROM campana');
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async eliminarCampana(id_campana) {
        // const {id} = id_campana;

        const result = await pool.query('DELETE FROM campana WHERE campana_id = $1 RETURNING *', [id_campana]);

        return result;
    }
}

module.exports = {
    CampanaRepository: CampanaRepository
}

