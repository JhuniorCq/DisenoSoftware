const transporter = require('../../nodemailer'); // Importar el transporter configurado
const {enviarCorreosNodemailer} = require('../../enviarCorreosNodemailer')
const { differenceInDays, differenceInMinutes, differenceInSeconds } = require('date-fns');

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

            const diferenciaHoras = Math.abs(horaE - horaA);//PONERLO EN MILISEGUNDOS
            const diferenciaMinutos = Math.abs(minutoE - minutoA);
            const diferenciaSegundos = Math.abs(segundoE - segundoA);

            console.log(`Diferencia de Horas: ${diferenciaHoras}`);
            console.log(`Diferencia de Minutos: ${diferenciaMinutos}`);
            console.log(`Diferencia de Segundos: ${diferenciaSegundos}`);
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
        } else if(fecha_envio == fecha_actual) {
            if(hora_envio <= hora_actual) {
                enviarCorreoNodemailer();
            } else {
 
                calcularDiferenciaHora();

                console.log(`El correo programado para ${instanciaCorreo.correo} debe ser enviado hoy, pero no a esta hora`);
            }
        } else {
            console.log(`El correo programado para ${instanciaCorreo.correo} no debe ser enviado hoy`);
        }
    }
}

//Estado Enviado
class EstadoEnviado {
    enviarCorreo(correo) {
        console.log(`Este correo ya ha sido enviado a ${correo}`);
    }
}

class Correo {
    constructor(datosDelCorreo, datosClientesParaCorreos, datosUnCliente) {// datosClientesParaCorreos ES UN ARRAY DE OBJETOS QUE CONTIENE -> campana_id, cliente_id y estado DE CADA CLIENTE (CADA OBJETO ES UN CLIENTE)
        const {campana_id, mensaje, fecha_envio, hora, titulo, asunto} = datosDelCorreo;
        // const {cliente_id, estado} = datosClientesParaCorreos;
        const {dni, nombre, apellido, fechanac, distrito, departamento, correo, sexo, fechaafili} = datosUnCliente;
        this.mensaje = mensaje;
        this.fecha_envio = fecha_envio;
        this.hora = hora,
        this.titulo = titulo,
        this.asunto = asunto,

        this.correo = correo;//DE AHI SI NECESITO LOS DEMÁS DATOS DE datosUnCliente LOS INICIALIZO EN ESTE CONSTRUCTOR

        this.estadoCorreoObjeto = new EstadoProgramado();//Con esto determino el Estado del Correo, en cada CLASE. No es lo mismo que el 'estado' de datosDelCorreo

        this.datosCliente = [];

        for(const datosCliente of datosClientesParaCorreos) {

            this.datosCliente.push({
                cliente_id: datosCliente.cliente_id,
                estado: datosCliente.estado //ESTE ESTADO ES EL DEL PARTICIPANTE -> ENVIADO O PROGRAMADO
            })
        }
    }

    transicionEstado(nuevoEstado) {// NO LO ESTOY USANDO EN LA LA CLASE Correo 
        this.nuevoEstado = nuevoEstado;
    }

    enviar(/*datosUnCliente*/) {//ESTOY QUE TRAIGO ESTE datosUnCliente de correoService, iré a Orinar :,v

        // const {dni, nombre, apellido, fechanac, distrito, departamento, correo, sexo, fechaafili} = datosUnCliente;

        this.estadoCorreoObjeto.enviarCorreo(this/*, correo*/);//Al pasarle el this le estoy pasando una instancia de la misma clase Correo
    }
}

module.exports = {
    Correo: Correo
}