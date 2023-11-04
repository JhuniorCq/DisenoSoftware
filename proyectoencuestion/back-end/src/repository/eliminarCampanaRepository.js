const pool = require('../db');

class EliminarCampanaRepository {
    async eliminarCampana(id_campana) {
        // const {id} = id_campana;

        const result = await pool.query('DELETE FROM campana WHERE campana_id = $1 RETURNING *', [id_campana]);

        return result;
    }
}

module.exports = {
    EliminarCampanaRepository: EliminarCampanaRepository
}