const transporter = require('../../nodemailer'); // Importar el transporter configurado
const { parseISO, add, isPast, parse } = require('date-fns');

//Estado Programado
class EstadoProgramado {
    async enviarCorreo(instanciaCorre/*, correoCliente*/) {

        const fecha_actual = new Date();

        //ENVIA CORREOS COMPARANDO LA FECHA DE ENVIO DESDE LA HORA 05:00 :,V , Y ESO LO COMPARA CON LA FECHA ACTUAL
        //POR ESO SI ENVIO LA FECHA DE HOY (PORQUE NO ESTOY USANDO LA HORA) ESO SE COMPARA CON LA FECHA ACTUAL QUE SI TIENE HORA
        if(instanciaCorreo.fecha_envio <= fecha_actual) {

            //ACÁ DEBO USAR EL nodemailer PARA ENVIAR LOS CORREOS
            const mailOptions = {
                from: 'holiver.ccora.quispe@gmail.com',
                to: instanciaCorreo.correo,
                subject: instanciaCorreo.asunto,
                text: instanciaCorreo.mensaje
            };

            await transporter.sendMail(mailOptions);

            // console.log(`Correo programado enviado a ${instanciaCorreo.correo}`);
            instanciaCorreo.estadoCorreoObjeto = new EstadoEnviado();
        } else {
            console.log(`El correo programado para ${instanciaCorreo.correo} no debe ser enviado hoy`);

            //ACÁ FALTA HACER QUE SI LA FECHA DE ENVIO AÚN NO LLEGA, PUES QUE SE ENVIE CUANDO LLEGUE LA FECHA DE ENVIO

            //ESTO RECIÉN ESTOY PONIENDOOOOOOOOOOOOOOOOOOOOOOO
            // Calcular la diferencia en milisegundos hasta el tiempo de envío
            // const tiempoRestante = instanciaCorreo.fecha_envio - fecha_actual;
            
            // // Configurar un temporizador para enviar el correo cuando llegue el momento
            // setTimeout(async () => {
            //     await this.enviarCorreo(instanciaCorreo);
            // }, tiempoRestante);

            //ENVIAR TODO ESTE PATRÓN A CHAT Y DECIRLE QUE QUIERO USAR TAL TAL YQUE ESTA RUTA ES DE TIPO POST     
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