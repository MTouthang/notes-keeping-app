import nodemailer from "nodemailer";
import config from "./index";

let transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.SMTP_USERNAME, // generated ethereal user
    pass: config.SMTP_PASSWORD, // generated ethereal password
  },
});

export default transporter;
