const pool = require('../db');

class ClienteRepository {

    async guardarCamposParticipante(campana_id, dniClientesFiltrados) {
        try {
            for(let i=0; i<dniClientesFiltrados.length; i++) {

                const cliente_id = dniClientesFiltrados[i];

                await pool.query('INSERT INTO participante (campana_id, cliente_id, estado) VALUES ($1, $2, $3)', [
                    campana_id,
                    cliente_id,
                    'Listo'
                ]);
            }

            return 'Datos almacenados en la tabla Participante correctamente';
        } catch(error) {
            throw console.error('No se ha podido guardar los datos en la tabla Participante', error.message);
        }
    }

    async buscarClientePorDNI(dniCliente) {
        try {

            const result = await pool.query('SELECT * FROM participante WHERE cliente_id = $1 ORDER BY participante_id DESC LIMIT 1', [dniCliente]);

            // VERIFICAR SI SE ENCONTRARON DATOS
            if (result.rows.length > 0) {
                // SI SE ENCONTRARON -> DEVUELVE LOS DATOS DEL PARTICIPANTE
                console.log(result.rows[0])
                return result.rows[0];
            } else {
                // SI NO SE ENCONTRARON
                return 'No se ha encontrado algún cliente con ese DNI';
            }
        } catch(error) {
            throw console.error('No se ha podido realizar la búsqueda del cliente por su DNI.', error.message);
        }
    }
}

module.exports = {
    ClienteRepository: ClienteRepository
}