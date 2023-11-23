
//Estado Programado
class EstadoProgramado {
    enviarCorreo(correo) {
        //Lógica para enviar el correo
        const fecha_actual = new Date();
        const fecha_envio = correo.fecha_envio;
        const cadenaFechaHoraLocal = fecha_actual.toLocaleString();
        const [fechaActual, horaActual] = cadenaFechaHoraLocal.split(',');

        if(fecha_envio <= fechaActual) {
            console.log(`Correo programado enviado a ${correo.correo}`);
            correo.estado = new EstadoEnviado();
        } else {
            console.log(`El correo programado para ${correo.correo} no debe ser enviado hoy`);
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
    constructor(correo, mensaje, fecha_envio) {
        this.correo = correo;
        this.mensaje = mensaje;
        this.fecha_envio = fecha_envio;
        this.estado = new EstadoProgramado();
    }

    enviar() {
        this.estado.enviarCorreo(this);
    }
}

module.exports = {
    Correo: Correo
}