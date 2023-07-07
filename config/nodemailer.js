import nodemailer from "nodemailer";

// eslint-disable-next-line no-undef
const { MAIL, MAIL_PASS } = process.env;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL,
    pass: MAIL_PASS,
  },
});

export const mailOptions = {
  from: MAIL,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error al enviar el correo:", error);
  } else {
    console.table("Correo enviado:", info.response);
  }
});