const pool = require('../db');

class MostrarCampanaRepository {
    async mostrarCampana() {
        try {
            const result = await pool.query('SELECT * FROM campana');
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    MostrarCampanaRepository: MostrarCampanaRepository
}