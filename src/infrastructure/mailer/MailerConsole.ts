import Mailer from "./Mailer";

export default class MailerConsole implements Mailer {
    async send(to: string, subject: string, message: string) {
        console.log(to, subject, message);
    }
}