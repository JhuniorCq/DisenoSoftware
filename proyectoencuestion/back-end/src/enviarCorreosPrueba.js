const transporter = require('./nodemailer'); // Importa el transporter configurado

const enviarCorreos = async (segmentoDeClientes, asunto, mensaje) => {//Estos 3 parámetros vienen de cuando estoy crenado el correo
    try {

        const segmentoDeClientes = [
            {
                correo: "holiver.ccora@unmsm.edu.pe"
            }
        ];

        const asunto = 'Ete menshaje ha sido enviado desde JS :3';
        const mensaje = 'Este es un mensaje :3';

        // Itera sobre los clientes y envía un correo a cada uno
        for (const cliente of segmentoDeClientes) {
            const mailOptions = {
                from: 'holiver.ccora.quispe@gmail.com',
                to: cliente.correo, // Usa el campo de correo de tu cliente
                subject: asunto,
                text: mensaje
            };

            // Envía el correo
            await transporter.sendMail(mailOptions);
        }

        //MANEJADOR DE EVENTOS PARA EL EVENTO 'error'
        transporter.on('error', error => {
            console.error('Error en el transporte de nodemailer:', error);
        });

    } catch (error) {
        console.error('Error al enviar correos:', error);
        throw error;
    }
};

console.log(enviarCorreos());

module.exports = { enviarCorreos };
