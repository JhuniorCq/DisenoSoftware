const pool = require('../db');
const {format, isThisMonth, isWithinInterval} = require('date-fns');

class CampanaRepository {
    async crearCampana(campanaData, promocion_id, segmentacion_id) {
        //Desestructuro a campanaDasta -> Ojo: promocion_id no forma parte de campanaData, pero si lo considera al hacer el query
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

    //Esto deberia ir en los archivos de prmocion :v
    async crearPromocion(campanaData) {

        const {promocion} = campanaData;
        const result = await pool.query('INSERT INTO promocion (promocion, estado) VALUES ($1, $2) RETURNING *', [promocion, 'activo']);

        return result.rows[0];
    }   

    async mostrarCampanas() {
        try {

            //FUSIONA TODOS LOS DATOS DE LA TABLA campana CON LOS DATOS promocion y estado DE LA TABLA promocion
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
            //campana es la Tabla y campana.fecha_creacion es la columna fecha_creacion en la tabla campana
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

    //USARÉ ESTO COMO FUNCIÓN, PERO NO COMO RUTA
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
}

module.exports = {
    CampanaRepository: CampanaRepository
}

