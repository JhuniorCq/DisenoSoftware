const pool = require('../db');

class ClienteRepository {
    async guardarDNICliente(clienteData) {
        const {dni} = clienteData;

        const result = await pool.query('INTERT INTO participante (campana_id, cliente_id, estado) VALUES ($1, $2, $3) RETURNING *', [
            campana_id,
            dni,
            estado
        ]);
        console.log(result.rows[0]);

        return result.rows[0];
    }
}

module.exports = {
    ClienteRepository: ClienteRepository
}