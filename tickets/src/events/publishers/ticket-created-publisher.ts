import { Publisher, Subjects, TicketCreatedEvent } from "@munlib/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

    async publish(data: TicketCreatedEvent["data"]): Promise<void> {
        try {
            await this.channel.assertQueue(this.subject);
            this.channel.sendToQueue(
                this.subject,
                Buffer.from(JSON.stringify(data)),
                { persistent: false }
            );
            console.log("Event published to queue", this.subject);
        } catch (error) {
            console.error("Error publishing event to queue", error);
        }
    }
}
