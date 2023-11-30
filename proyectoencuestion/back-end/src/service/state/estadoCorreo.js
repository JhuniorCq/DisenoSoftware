const transporter = require('../../nodemailer'); // Importar el transporter configurado
const {enviarCorreosNodemailer} = require('../../enviarCorreosNodemailer')
const {ClienteRepository} = require('../../repository/clienteRepository')
const clienteRepository = new ClienteRepository();
// const { differenceInDays, differenceInMinutes, differenceInSeconds } = require('date-fns');

//Estado Programado
class EstadoProgramado {
    async enviarCorreo(instanciaCorreo) {

        const fecha_actual_Date = new Date();

        const fecha_actual = fecha_actual_Date.toISOString().split('T', 1)[0];;
        const hora_actual = fecha_actual_Date.toLocaleTimeString('es-ES');
        const fecha_envio = instanciaCorreo.fecha_envio.toISOString().split('T', 1)[0];
        const hora_envio = instanciaCorreo.hora;

        const calcularDiferenciaHora = () => {
            const [horaE, minutoE, segundoE] = hora_envio.split(":").map(Number);
            const [horaA, minutoA, segundoA] = hora_actual.split(":").map(Number);

            const diferenciaHoras = Math.abs(horaE - horaA)*60*60*1000;//PONERLO EN MILISEGUNDOS
            const diferenciaMinutos = Math.abs(minutoE - minutoA)*60*1000;
            const diferenciaSegundos = Math.abs(segundoE - segundoA)*1000;

            const timpoTotalEspera = diferenciaHoras + diferenciaMinutos + diferenciaSegundos;

            console.log(`Diferencia de Horas en milisegundos: ${diferenciaHoras}`);
            console.log(`Diferencia de Minutos en milisegundos: ${diferenciaMinutos}`);
            console.log(`Diferencia de Segundos en milisegundos: ${diferenciaSegundos}`);
            console.log(`Tiempo Total de Espera: ${timpoTotalEspera}`);

            return timpoTotalEspera;
        }

        console.log(`Fecha actual: ${fecha_actual}`);
        console.log(`Fecha envío: ${fecha_envio}`);
        console.log(`Hora actual: ${hora_actual}`);
        console.log(`Hora envío ${hora_envio}`);
        
        const enviarCorreoNodemailer = () => {
            try {

                enviarCorreosNodemailer(instanciaCorreo.correo, instanciaCorreo.asunto, instanciaCorreo.mensaje);
                console.log(`Correo programado enviado a ${instanciaCorreo.correo}`);
                instanciaCorreo.estadoCorreoObjeto = new EstadoEnviado();

            } catch(error) {
                throw console.error('Error al enviar correos con Nodemailer', error.message)
            }
        };

        if(fecha_envio < fecha_actual) {
            enviarCorreoNodemailer();

            // const result = await clienteRepository.modificarEstadoParticipante(instanciaCorreo.campana_id, instanciaCorreo.estado);

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
        }
    }
}

//Estado Enviado
class EstadoEnviado {
    enviarCorreo(instanciaCorreo) {
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

        // this.datosCliente = [];

        // for(const datosCliente of dni_y_EstadoClientes) {

        //     this.datosCliente.push({
        //         cliente_id: datosCliente.cliente_id,
        //         estado: datosCliente.estado //ESTE ESTADO ES EL DEL PARTICIPANTE -> ENVIADO O PROGRAMADO
        //     })
        // }
    }

    async transicionEstado(campana_id, estado) {// NO LO ESTOY USANDO EN LA LA CLASE Correo 
        const result = await clienteRepository.modificarEstadoParticipante(campana_id, estado);
    }

    enviar() {
        this.estadoCorreoObjeto.enviarCorreo(this/*, correo*/);//Al pasarle el this le estoy pasando una instancia de la misma clase Correo
    }
}

module.exports = {
    Correo: Correo
}