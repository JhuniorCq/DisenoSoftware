const pool = require('../db');

class InicioSesionRepository {
    async iniciarSesion(iniciarSesionData) {
        try {
            const {dni, contrasena, id_rol} = iniciarSesionData;

            const datosInicioSesion = await pool.query('SELECT * FROM usuario WHERE dni = $1 AND contrasena = $2 AND id_rol = $3', [dni, contrasena, id_rol]);

            console.log(datosInicioSesion.rows);
            // console.log(datosInicioSesion.rows[0].dni);

            return datosInicioSesion.rows;
        } catch(error) {
            throw console.error('Hay un error en iniciarSesion en inicioSesionRepository', error.message);
        }
    }
}

module.exports = {
    InicioSesionRepository: InicioSesionRepository
}