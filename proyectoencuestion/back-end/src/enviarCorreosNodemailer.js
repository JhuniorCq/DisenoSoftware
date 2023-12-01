const transporter = require('./nodemailer'); // Importar el transporter configurado

const enviarCorreosNodemailer = async (correo, asunto, mensaje) => {
    try {

        const mailOptions = {
            from: 'holiver.ccora.quispe@gmail.com',
            to: correo, 
            subject: asunto,
            text: mensaje
        };

        await transporter.sendMail(mailOptions);

        //MANEJADOR DE EVENTOS PARA EL EVENTO 'error'
        transporter.on('error', error => {
            console.error('Error en el transporte de nodemailer:', error);
        });

    } catch (error) {
        console.error('Error al enviar correos:', error.message);
        throw error;
    }
};

module.exports = { enviarCorreosNodemailer };
