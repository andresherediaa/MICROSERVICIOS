import { Subjects, Listener, TicketUpdatedEvent } from '@munlib/common';
import { Ticket } from '../../models/ticket';
import { ConsumeMessage } from "amqplib";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

    async onMessage(data: TicketUpdatedEvent["data"], msg: ConsumeMessage) {
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();
    }
}
