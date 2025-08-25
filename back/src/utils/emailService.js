const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})


const sendPasswordChangeConfirmation = async (toEmail, username) => {
    const mailOption = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Confirmacion de cambio de contraseña',
        text: `Hola ${username},\n\nTu contraseña ha sido cambiada correctamente.\n\nSi no fuiste tú, contacta con soporte inmediatamente.`,
    }
    await transporter.sendMail(mailOption)
}


module.exports={
    sendPasswordChangeConfirmation
}