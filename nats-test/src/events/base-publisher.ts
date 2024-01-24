import { Channel } from "amqplib/callback_api";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T["subject"];
    protected channel!: Channel;

    constructor(channel: Channel) {
        this.channel = channel;
    }
}
