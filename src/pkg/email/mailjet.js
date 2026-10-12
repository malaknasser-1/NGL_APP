import Mailjet from "node-mailjet";

export class MailjetProvider {
    client;
    fromEmail;
    fromName;

    constructor(config) {
      
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.apiSecret,
        });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }

    async sendMail(email, subject, html) {
        try {
            const request = this.client
                .post("send", { version: 'v3.1' })
                .request({
                    Messages: [
                        {
                            From: {
                                Email: this.fromEmail,
                                Name: this.fromName,
                            },
                            To: [
                                {
                                    Email: email,
                                },
                            ],
                            Subject: subject,
                            HTMLPart: html,
                        },
                    ],
                });

            const result = await request;
            console.log("Email sent successfully:", result.body);
            return true;
        } catch (error) {
            console.error("Error sending email via Mailjet:", error.statusCode || error);
            throw error;
        }
    }
}