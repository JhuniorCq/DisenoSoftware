const pool = require('../db');

class ClienteRepository {

    async modificarEstadoParticipante(campana_id, estado) {//El estado que se enviará será "Enviado" o "Programado"
        try {

            const result = await pool.query('UPDATE participante SET estado = $1 WHERE campana_id = $2', [estado, campana_id]);

            console.log(`Se han modificado ${result.rowCount} filas`);

        } catch(error) {
            throw console.error('Error al quere modificar el estado del participante', error.message)
        }
    }

    async guardarCamposParticipante(campana_id, dniClientesFiltrados) {
        try {
            for(let i=0; i<dniClientesFiltrados.length; i++) {

                const cliente_id = dniClientesFiltrados[i];

                await pool.query('INSERT INTO participante (campana_id, cliente_id, estado) VALUES ($1, $2, $3)', [
                    campana_id,
                    cliente_id,
                    'Sin estado'
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

    async traerDNIClientesParaCorreos(campana_id) {
        try {

            const dni_y_EstadoClientes = await pool.query('SELECT campana_id, cliente_id, estado FROM participante WHERE campana_id = $1', [campana_id]);

            return dni_y_EstadoClientes.rows;

        } catch(error) {
            throw console.error('No se pudo traer los clientes para enviar los correos', error.message);
        }
    }

    async obtenerClientesSegmentados(campana_id) {
        try {
            
            // Ejecutar la consulta con el valor de campana_id como parámetro
            const dniClientes = await pool.query('SELECT campana_id, cliente_id FROM participante WHERE campana_id = $1', [campana_id]);
            console.log(dniClientes.rows);
            
            return dniClientes.rows;
        } catch(error) {
            throw console.error('Error en el método buscarCampanaPorID en clienteService.js', error.message)
        }
    }
}

module.exports = {
    ClienteRepository: ClienteRepository
}