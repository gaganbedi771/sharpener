const Sib = require("sib-api-v3-sdk");

const client = Sib.ApiClient.instance;
console.log(process.env.SMTP_KEY);
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SMTP_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

async function sendPasswordResetEmail(toEmail, resetLink) {
  try {
    const sender = { email: "gaganbedi771@gmail.com", name: "Expense-Tracker" };
    const receivers = [{ email: toEmail }];

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Password Reset Request",
      textContent: `Click here to reset your password: ${resetLink}`,
      htmlContent: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendPasswordResetEmail;
