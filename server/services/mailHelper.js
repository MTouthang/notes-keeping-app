import config from "../config/index";
const mailHelper = async (options) => {
  const message = {
    from: config.SMTP_MAIL,
    to: options.mail,
    subject: options.subject,
    text: options.text,
    // html: "<p>HTML version of the message</p>",
  };
};

export default mailHelper;
