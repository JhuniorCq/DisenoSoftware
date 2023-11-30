const {enviarCorreosNodemailer} = require('../../enviarCorreosNodemailer')
const {ClienteRepository} = require('../../repository/clienteRepository')
const clienteRepository = new ClienteRepository();

class EstadoCorreo {
    enviarCorreo(instanciaCorreo) {
        throw new Error("Método abstracto. Debe ser implementado por clases derivadas.");
    }
}

class EstadoProgramado extends EstadoCorreo {
    async enviarCorreo(instanciaCorreo) {

        instanciaCorreo.transicionEstadoParticipante(instanciaCorreo.campana_id, 'Programado');
        instanciaCorreo.estado = 'Programado'

        const fecha_actual_Date = new Date();

        const fecha_actual = fecha_actual_Date.toISOString().split('T', 1)[0];;
        const hora_actual = fecha_actual_Date.toLocaleTimeString('es-ES');
        const fecha_envio = instanciaCorreo.fecha_envio.toISOString().split('T', 1)[0];
        const hora_envio = instanciaCorreo.hora;

        const calcularDiferenciaHora = () => {

            //CONVIERTO A DATE, PERO PONIENDOLE CUALQUIER FECHA, YA QUE ESTAS SE ELIMINARÁN AL RESTARLAS
            const horaActualDATE = new Date(`2023-11-30T${hora_actual}`);
            const horaEnvioDATE = new Date(`2023-11-30T${hora_envio}`);

            const diferenciaMilisegundos = horaEnvioDATE - horaActualDATE;

            console.log(`Diferencia Date Milisegundos: ${diferenciaMilisegundos}`);

            return diferenciaMilisegundos;
        }

        console.log(`Fecha actual: ${fecha_actual}`);
        console.log(`Fecha envío: ${fecha_envio}`);
        console.log(`Hora actual: ${hora_actual}`);
        console.log(`Hora envío ${hora_envio}`);
        
        const enviarCorreoNodemailer = () => {
            try {

                enviarCorreosNodemailer(instanciaCorreo.correo, instanciaCorreo.asunto, instanciaCorreo.mensaje);

                console.log(`Correo programado enviado a ${instanciaCorreo.correo}`);

                instanciaCorreo.estadoCorreoObjeto = new EstadoEnviado();//Ahora se le asignó un Objeto de la clase EstadoEnviado, por lo que si se usar el método "enviarCorreo" se devolverá un mensaje indicado que ya se envió el correo

                instanciaCorreo.transicionEstadoParticipante(instanciaCorreo.campana_id, 'Enviado');
                instanciaCorreo.estado = 'Enviado'

            } catch(error) {
                throw console.error('Error al enviar correos con Nodemailer', error.message)
            }
        };

        if(fecha_envio < fecha_actual) {
            enviarCorreoNodemailer();

        } else if(fecha_envio == fecha_actual) {
            if(hora_envio <= hora_actual) {
                enviarCorreoNodemailer();

            } else {
 
                const tiempoTotalEspera = calcularDiferenciaHora();

                setTimeout(enviarCorreoNodemailer, tiempoTotalEspera);

                console.log(`El correo programado para ${instanciaCorreo.correo} debe ser enviado hoy a las ${hora_envio}`);

            }
        } else {
            console.log(`El correo programado para ${instanciaCorreo.correo} debe ser enviado el ${fecha_envio} a las ${hora_envio}`);

            //ACÁ DEBE IR CÓDIGO PARA QUE EL CORREO SE ENVÍE DÍAS DESPUÉS ->  SE DEBE USAR setTimeout DE NUEVO CREO
        }

    }
}

class EstadoEnviado extends EstadoCorreo {
    enviarCorreo(instanciaCorreo) {
        // Realizar acciones específicas del estado enviado
        console.log(`Este correo ya ha sido enviado a ${instanciaCorreo.correo}`);
    }
}

class Correo {
    constructor(datosDelCorreo, estado, datosUnCliente) {
        const {campana_id, mensaje, fecha_envio, hora, titulo, asunto} = datosDelCorreo;
        const {dni, nombre, apellido, fechanac, distrito, departamento, correo, sexo, fechaafili} = datosUnCliente;
        this.campana_id = campana_id;//Este campana_id lo usaré para ubicar a los PARTICIPANTES y almacenar el estado "Enviado" o "Programado" en ellos
        this.mensaje = mensaje;
        this.fecha_envio = fecha_envio;
        this.hora = hora,
        this.titulo = titulo,
        this.asunto = asunto,

        this.estado = estado;//Este estado es el de la tabla participante, puede ser programado o enviado

        this.correo = correo;//DE AHI SI NECESITO LOS DEMÁS DATOS DE datosUnCliente LOS INICIALIZO EN ESTE CONSTRUCTOR

        this.estadoCorreoObjeto = new EstadoProgramado();//Con esto determino el Estado del Correo, en cada CLASE. No es lo mismo que el 'estado' de datosDelCorreo
    }

    async transicionEstadoParticipante(campana_id, estado) {// NO LO ESTOY USANDO EN LA LA CLASE Correo 
        await clienteRepository.modificarEstadoParticipante(campana_id, estado);
    }

    enviar() {
        this.estadoCorreoObjeto.enviarCorreo(this);//Al pasarle el this le estoy pasando una instancia de la misma clase Correo
    }
}

module.exports = {
    Correo: Correo
}