const transporter = require('../../nodemailer'); // Importar el transporter configurado

//Estado Programado
class EstadoProgramado {
    async enviarCorreo(instanciaCorreo, correoCliente) {//ACÁ SERÍA TRAER LA VARIABLE -> TIPOCAMPANA Y DE AHI HACER UN IF PARA CAMBIAR EL ESTADO

        const fecha_actual = new Date();
        const fecha_envio = instanciaCorreo.fecha_envio;

        if(fecha_envio <= fecha_actual) {

            //ACÁ DEBO USAR EL nodemailer PARA ENVIAR LOS CORREOS
            const mailOptions = {
                from: 'holiver.ccora.quispe@gmail.com',
                to: correoCliente,
                subject: instanciaCorreo.asunto,
                text: instanciaCorreo.mensaje
            };

            await transporter.sendMail(mailOptions);    //HACEEEEEEEEEEER LO DEL ESTADOOOO DEL CORREO, OSEA EL STRING QUE SE IRA A LA BD :VVVVVVVVV

            console.log(`Correo programado enviado a ${correoCliente}`);
            instanciaCorreo.estadoCorreoObjeto = new EstadoEnviado();
        } else {
            console.log(`El correo programado para ${correoCliente} no debe ser enviado hoy`);
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
    constructor(datosDelCorreo, datosClientesParaCorreos) {
        const {campana_id, mensaje, fecha_envio, hora, titulo, asunto} = datosDelCorreo;
        // const {cliente_id, estado} = datosClientesParaCorreos;
        this.mensaje = mensaje;
        this.fecha_envio = fecha_envio;
        this.hora = hora,
        this.titulo = titulo,
        this.asunto = asunto,

        this.estadoCorreoObjeto = new EstadoProgramado();//Con esto determino el Estado del Correo, en cada CLASE. No es lo mismo que el 'estado' de datosDelCorreo

        this.datosCliente = [];

        for(const datosCliente of datosClientesParaCorreos) {

            this.datosCliente.push({
                cliente_id: datosCliente.cliente_id,
                estado: datosCliente.estado //ESTE ESTADO ES EL DEL PARTICIPANTE -> ENVIADO O PROGRAMADO
            })
        }
    }

    transicionEstado(nuevoEstado) {
        this.nuevoEstado = nuevoEstado;
    }

    enviar(datosUnCliente) {//ESTOY QUE TRAIGO ESTE datosUnCliente de correoService, iré a Orinar :,v

        const {dni, nombre, apellido, fechanac, distrito, departamento, correo, sexo, fechaafili} = datosUnCliente;

        this.estadoCorreoObjeto.enviarCorreo(this, correo);//Al pasarle el this le estoy pasando una instancia de la misma clase Correo
    }
}

module.exports = {
    Correo: Correo
}