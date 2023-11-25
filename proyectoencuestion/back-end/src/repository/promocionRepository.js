const pool = require('../db');

class PromocionRepository {
    async buscarPromocionPorID(idPromocion) {
        try {
            const result = await pool.query('SELECT * FROM promocion WHERE promocion_id = $1', [idPromocion]);

            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return 'No se encontró la promoción buscada'; // O puedes lanzar un error o manejar el caso cuando no se encuentra la campaña
            }
    
        } catch (error) {
            throw error;
        }
    }
}


module.exports = {
    PromocionRepository: PromocionRepository
}