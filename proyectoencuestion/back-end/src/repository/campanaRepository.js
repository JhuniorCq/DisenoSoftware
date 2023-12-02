const pool = require('../db');
const {isThisMonth, isWithinInterval} = require('date-fns');

class CampanaRepository {
    async crearCampana(campanaData, promocion_id, segmentacion_id) {
        const { fecha_inicio, fecha_fin, nombre, tipo_campana, descripcion, objetivos, fecha_creacion } = campanaData;

        const result = await pool.query('INSERT INTO campana ("fecha_inicio", "fecha_fin", nombre, "tipo_campana", descripcion, objetivos, "segmentacion_id", "promocion_id", "fecha_creacion") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [
            fecha_inicio, 
            fecha_fin, 
            nombre, 
            tipo_campana, 
            descripcion, 
            objetivos,
            segmentacion_id,
            promocion_id,
            fecha_creacion
        ]);

        return result.rows[0];
    }

    async crearPromocion(campanaData) {

        const {promocion} = campanaData;
        let estado = 'activo';
        const fecha_actual = new Date();
        const fecha_fin = new Date(campanaData.fecha_fin);

        if(fecha_actual > fecha_fin) {
            estado = 'no activo';
        }
        
        const result = await pool.query('INSERT INTO promocion (promocion, estado) VALUES ($1, $2) RETURNING *', [promocion, estado]);

        return result.rows[0];
    }   

    async mostrarCampanas() {
        try {
            const datosTodasCampanas = await pool.query('SELECT campana.*, promocion.promocion, promocion.estado FROM campana LEFT JOIN promocion ON campana.promocion_id = promocion.promocion_id ORDER BY fecha_creacion DESC');

            console.log(datosTodasCampanas.rows);

            return datosTodasCampanas.rows;
        } catch (error) {
            throw error;
        }
    }

    async mostrarCampanasEsteMes() {
        try {
            const result = await pool.query('SELECT * FROM campana ORDER BY fecha_creacion DESC');

            const campanasEsteMes = result.rows.filter(campana => isThisMonth(new Date(campana.fecha_creacion)))

            return campanasEsteMes;
        } catch(error) {
            throw error;
        }
    }

    async mostrarCampanasRecientes() {
        try {
            const result = await pool.query('SELECT * FROM campana ORDER BY fecha_creacion DESC');

            const campanasRecientes = result.rows.filter(campana => isWithinInterval(new Date(campana.fecha_creacion), { start: new Date(new Date().setDate(new Date().getDate() - 7)), end: new Date() }));

            return campanasRecientes;
        } catch(error) {
            throw error;
        }
     }

    async eliminarCampana(id_campana) {
        const result = await pool.query('DELETE FROM campana WHERE campana_id = $1 RETURNING *', [id_campana]);

        return result;
    }

    async mostrarTipoCampana(tipoCampanaID) {
        try{
            const todosTipoCampana = await pool.query('SELECT * FROM tipo_campana');
    
            for(let i=0; i<3; i++) {
                if(todosTipoCampana.rows[i].camid == tipoCampanaID) {
                    return todosTipoCampana.rows[i].camid;
                }
            }
        } catch(error) {
            error;
        }
    }

    async mostrarCampanasCorreo() {
        try {
            const correoCampanas = await pool.query('SELECT * FROM campana WHERE tipo_campana = 2');
            
            return correoCampanas.rows;
            
        } catch(error) {
            throw error;
        }
    }
    
    async mostrarCampanasLlamada() {
        try {
            const llamadaCampanas = await pool.query('SELECT * FROM campana WHERE tipo_campana = 1');

            return llamadaCampanas.rows;

        } catch(error) {
            throw error;
        }
    }
    
    async mostrarCampanasSorteo() {
        try {
            const sorteoCampanas = await pool.query('SELECT * FROM campana WHERE tipo_campana = 3');

            return sorteoCampanas.rows;
        } catch(error) {
            throw error;
        }
    }

    async buscarCampanaPorID(idCampana) {
        try {
            const result = await pool.query('SELECT * FROM campana WHERE campana_id = $1', [idCampana]);

            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return 'No se encontró la campaña buscada';
            }
    
        } catch (error) {
            throw error;
        }
    }

    async infoCampana() {
            try {

            const result = await pool.query('SELECT c.campana_id, c.nombre, c.tipo_campana, p.promocion FROM campana c JOIN promocion p ON c.promocion_id = p.promocion_id;');

            if (result.rows.length > 0) {

                console.log(result.rows)
                return result.rows;

            } else {

                return null;
            }
        } catch(error) {
            throw console.error('No se pudo obtener la información de las Campañas', error.message);
        }
    }
}

module.exports = {
    CampanaRepository: CampanaRepository
}

