const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // o SMTP personalizado
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

const resetLink = `https://webtrabajo-1.onrender.com/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    const mailOptions = {
        from: `"Soporte - MiAplicación" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🔐 Recuperación de contraseña',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                
                <h2 style="color: #333333; text-align: center;">Recupera tu contraseña</h2>
                <p style="color: #555555; font-size: 15px;">
                    Hola, hemos recibido una solicitud para restablecer tu contraseña.
                </p>
                <p style="color: #555555; font-size: 15px;">
                    Haz clic en el botón de abajo para establecer una nueva contraseña.  
                    <strong>Este enlace expirará en 1 hora.</strong>
                </p>
                
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
                       Restablecer contraseña
                    </a>
                </div>

                <p style="color: #999999; font-size: 13px; text-align: center;">
                    Si no solicitaste este cambio, puedes ignorar este correo.
                </p>

            </div>
        </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;