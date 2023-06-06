// controllers/smsController.js
require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

exports.sendSms = async (req, res) => {
    try {
        const message = await client.messages.create({
            body: req.body.message,
            to: req.body.to,  
            from: '+13613136225'
        });
        res.status(200).send({ status: 'Message sent', message });
    } catch (error) {
        res.status(500).send({ status: 'Error sending SMS', error: error.message });
    }
};
