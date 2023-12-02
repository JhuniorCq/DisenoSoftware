const pool = require('../db');

class SorteoRepository {
    async crearMensajeSorteo(sorteoData) {
        try {
            const {campana_id, asunto, mensaje} = sorteoData;

                //SE DEBE PRESIOAR EL BOTON ENVIAR UNA SOLA VEZ, SI SE PRESIONA MÁS VECES SE GUARDARÁN LOS MISMO DATOS EN LA BD CON EL MISMO campana_id
                const result = await pool.query('INSERT INTO cam_sorteo (campana_id, asunto, mensaje, cantidad_ganadores) VALUES ($1, $2, $3, $4) RETURNING *;', [campana_id, asunto, mensaje, 0]);

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

            const result = await pool.query('UPDATE cam_sorteo SET cantidad_ganadores = $1 WHERE campana_id = $2 RETURNING cam_sorteo_id',[
                cantidad_ganadores, 
                campana_id]
            );
    
            console.log(`Se han actualizado ${result.rowCount} filas`);

            return result.rows[0].cam_sorteo_id;

        } catch(error) {
            throw console.error('Error en realizarSorteo en sorteoRepository.js', error.message);
        }
    }

    async guardarGanadores(ganadores, cam_sorteo_id) {
        try {
            for(const ganador of ganadores) {
                const {dni} = ganador;

                const result = await pool.query('INSERT INTO ganador (dni, cam_sorteo_id) VALUES ($1, $2) RETURNING *',[dni, cam_sorteo_id]);
            }
            
            console.log(`Se guardaron los datos de los ganadores exitosamente`)
        } catch(error) {
            throw console.error('Error en guardarGanadores en sorteoRepository.js', error.message);
        }
    }
}

module.exports = {
    SorteoRepository: SorteoRepository
}