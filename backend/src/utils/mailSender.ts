import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: 587, // Common port for SMTP
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailSender = async (email: string, title: string, body: string) => {
  const info = await transporter.sendMail({
    from: `"Haseeb || Stuition" <${process.env.MAIL_USER}>`,
    to: email,
    subject: title,
    text: body,
    html: body,
  });

  console.log("Email sent successfully...");
  return info;
};

export default mailSender;
