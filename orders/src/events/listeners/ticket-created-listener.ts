import { Subjects, Listener, TicketCreatedEvent } from '@munlib/common';
import { Ticket } from '../../models/ticket';
import { ConsumeMessage } from "amqplib";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

    async onMessage(data: TicketCreatedEvent["data"], msg: ConsumeMessage) {
        const { id, title, price } = data;
        console.log("TicketCreatedListener", data);
        const ticket = Ticket.build({
            id,
            title,
            price,
        });
        await ticket.save();
    }
}
