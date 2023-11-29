require('dotenv').config();

class EmailSender {
    constructor() {
        this.apiKey = process.env.EMAIL_API_KEY;
    }
    sendEmail(email, subject, message) {

    }
}