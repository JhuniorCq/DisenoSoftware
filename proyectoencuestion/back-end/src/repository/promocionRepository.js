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

    async modificarEstadoPromocion(promocion_id) {
        try {
            const result = await pool.query('UPDATE promocion SET estado = $1 WHERE promocion_id = $2', ['No valido', promocion_id]);

            console.log(`Se han modificado ${result.rowCount} filas -> El estado de la promoción #${promocion_id}`);

            return result.rowCount;
        } catch(error) {
            throw console.error('Error en modificarEstadoPromocion en promocionRepository.js', error.message);
        }
    }
}


module.exports = {
    PromocionRepository: PromocionRepository
}