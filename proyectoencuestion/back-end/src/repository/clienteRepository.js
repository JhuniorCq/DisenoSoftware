const pool = require('../db');

class ClienteRepository {
    async guardarDNICliente(clienteData, campanaData) {//Este campanaData me puede servir para traer el campana_id , pero 
        try {
            const {dni} = clienteData;

            const result = await pool.query('INTERT INTO participante (campana_id, cliente_id, estado) VALUES ($1, $2, $3) RETURNING *', [
                campana_id,//Tengo que traer el campana_id
                dni,
                'listo'
            ]);
            console.log(result.rows[0]);
    
            return result.rows[0];
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {
    ClienteRepository: ClienteRepository
}