import config from "../config/index.js";
import transporter from "../config/transporter.config.js";
const mailHelper = async (options) => {
  const message = {
    from: config.SMTP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.text,
    // html: "<p>HTML version of the message</p>",
  };
  await transporter.sendMail(message);
};

export default mailHelper;
