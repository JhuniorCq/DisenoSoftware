const nodemailer = require('nodemailer');

//ESTA ES MÁS SEGURA
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'holiver.ccora.quispe@gmail.com',
        pass: 'owfi uyvv tvym vqbl' //Contraseña de Aplicación
    }
});

module.exports = transporter;

