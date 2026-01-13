// import nodemailer from "nodemailer";

// const transpoter = nodemailer.createTransport({
//     host:'smtp-relay.brevo.com',
//     port:587,
//     auth :{
//         user:process.env.SMTP_USER,
//         pass:process.env.SMTP_PASS, 
        
//     }
// })
// export default transpoter;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail', // Brevo host ki jagah 'gmail' service use karein
    auth: {
        user: process.env.SMTP_USER, // Aapka Gmail: atharalisbr@gmail.com
        pass: process.env.SMTP_PASS, // Aapka 16-digit Google App Password
    }
});

export default transporter;
