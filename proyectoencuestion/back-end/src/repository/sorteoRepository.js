const pool = require('../db');

class SorteoRepository {
    async crearMensajeSorteo(sorteoData) {
        try {
            const {campana_id, asunto, mensaje} = sorteoData;

                // DE AHI LE QUITO EL CANTIDAD GANADORES, ESO SE LLENARA DE AHI
                const result = await pool.query('INSERT INTO cam_sorteo (campana_id, asunto, mensaje) VALUES ($1, $2, $3) RETURNING *;', [campana_id, asunto, mensaje]);

                console.log(result.rows);

                // Puedes devolver el resultado si es necesario
                return result.rows;

        } catch(error) {
            throw console.error('Error en crearMensajeSorteo en sorteoRepository.js', error.message);
        }
    }

    async realizarSorteo(sorteoData) {
        try {
            const {campana_id, cantidad_ganadores} = sorteoData;

        } catch(error) {
            throw console.error('Error en realizarSorteo en sorteoRepository.js', error.message);
        }
    }
}

module.exports = {
    SorteoRepository: SorteoRepository
}