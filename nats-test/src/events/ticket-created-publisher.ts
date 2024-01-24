// ticket-created-publisher.ts
import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

    async publish(data: TicketCreatedEvent["data"]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.channel.sendToQueue(
                this.subject,
                Buffer.from(JSON.stringify(data)),
                { persistent: true } // Hace que los mensajes sean persistentes
            );

            console.log("Event published to queue", this.subject);
            resolve();
        });
    }
}
