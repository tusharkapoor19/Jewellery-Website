const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendNotificationSMS = async ({ phone, message }) => {
  if (!phone) {
    throw new Error("Recipient phone number is required");
  }

  const result = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });

  console.log("SMS SENT:", result.sid);
  console.log("SMS STATUS:", result.status);

  return result;
};

module.exports = {
  sendNotificationSMS,
};