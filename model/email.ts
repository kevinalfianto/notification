// Represent Email to make encode or decode easier
export class Email {
    recipients: string[];
    subject: string;
    body: string;
  
    constructor(recipients: string[], subject: string, body: string) {
      this.recipients = recipients;
      this.subject = subject;
      this.body = body;
    }
}