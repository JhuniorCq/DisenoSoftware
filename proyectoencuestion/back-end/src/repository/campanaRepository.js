const pool = require('../db');

class CampanaRepository {
    async crearCampana(campanaData, promocion_id) {
        //Desestructuro a campanaDasta -> Ojo: promocion_id no forma parte de campanaData, pero si lo considera al hacer el query
        const { fecha_inicio, fecha_fin, nombre, tipo_campana, descripcion, objetivos, usuario_id, segmentacion_id } = campanaData;

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

    async crearPromocion(campanaData) {

        const {promocion} = campanaData;
        const result = await pool.query('INSERT INTO promocion (promocion, estado) VALUES ($1, $2) RETURNING *', [promocion, 'activo']);

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

    async mostrarTipoCampana(tipoCampanaID) {
        const todosTipoCampana = await pool.query('SELECT * FROM tipo_campana');
        const resultTipoCampana = await pool.query('SELECT * FROM campana WHERE tipo_campana = $1', [tipoCampanaID]);
        const un_tipo_campana = resultTipoCampana.rows[0];

        let nombreTipoCampana;
        for(let i=0; i<3; i++) {
            if(todosTipoCampana.rows[i].camid === un_tipo_campana.tipo_campana) {
                nombreTipoCampana = todosTipoCampana.rows[i].nombre;
            }
        }
        console.log(nombreTipoCampana);
        console.log(todosTipoCampana.rows);
        return nombreTipoCampana;
    }
}

module.exports = {
    CampanaRepository: CampanaRepository
}

