import { Channel } from "amqplib";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T["subject"];
    abstract onMessage(data: T["data"], msg: any): void;
    private channel: Channel;

    constructor(channel: Channel) {
        this.channel = channel;
    }

    async listen() {
        await this.channel.assertQueue(this.subject, {
            durable: false,
        });

        this.channel.consume(this.subject, (msg) => {
            if (msg) {
                const parsedData = this.parseMessage(msg);
                this.onMessage(parsedData, msg);
                this.channel.ack(msg);
            }
        });
    }

    parseMessage(msg: any) {
        const data = msg.content.toString();
        return JSON.parse(data);
    }
}
