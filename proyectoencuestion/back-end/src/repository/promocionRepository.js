const pool = require('../db');

class PromocionRepository {
    async buscarPromoDNI(dni_cliente) {//Este es el Intermediario
        try {
            const query= "SELECT * FROM promo_cliente WHERE dni_cliente = $1";
            const result= await pool.query(query, [dni_cliente])
            if(result.rows.length===0){
                return null;
                // res.json(null)
            }
            else{
                return result.rows[0];
                // res.json(result.rows[0])
            }
        } catch(error) {
            console.error("Error al obtener cliente: ", error);
        }
    }

    async buscaPromo(promocion_id) {//Este recibe el retorno del intermediario
        try {
            const query= "SELECT * FROM promocion WHERE promocion_id= $1";
            const result= await pool.query(query, [promocion_id])
            if(result.rows.length===0){
                return null;
                // res.json(null)
            }
            else{
                return result.rows[0];
                // res.json(result.rows[0])
            }
        } catch(error) {
            console.error("Error al obtener cliente: ", error);
        }
    }
}


module.exports = {
    PromocionRepository: PromocionRepository
}