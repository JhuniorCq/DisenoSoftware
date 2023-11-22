const pool = require('../db');

class CampanaRepository {
    async crearCampana(campanaData) {
        const { fecha_inicio, fecha_fin, nombre, tipo_campana, descripcion, objetivos, usuario_id, segmentacion_id, promocion_id } = campanaData;

        const result = await pool.query('INSERT INTO campana ("fecha_inicio", "fecha_fin", nombre, "tipo_campana", descripcion, objetivos, "usuario_id", "segmentacion_id", "promocion_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [
            fecha_inicio, 
            fecha_fin, 
            nombre, 
            tipo_campana, 
            descripcion, 
            objetivos,
            usuario_id,
            segmentacion_id,
            promocion_id
        ]);

        return result.rows[0];
    }

    async mostrarCampanas() {
        try {
            const result = await pool.query('SELECT * FROM campana');
            return result.rows;
        } catch (error) {
            throw new Error("Hubo un error al mostrar todas las campañas");
        }
    }

    async eliminarCampana(id_campana) {
        const result = await pool.query('DELETE FROM campana WHERE campana_id = $1 RETURNING *', [id_campana]);

        return result;
    }

    async mostrarTipoCampana() {
        const result = await pool.query('SELECT * FROM tipo_campana');

        return result;
    }
}

module.exports = {
    CampanaRepository: CampanaRepository
}

