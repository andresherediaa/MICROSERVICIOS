import { Listener, OrderCreatedEvent, Subjects } from '@munlib/common';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { ConsumeMessage } from "amqplib";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    async onMessage(data: OrderCreatedEvent["data"], msg: ConsumeMessage) {
        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        console.log("OrderCreatedListener", data);
        // If no ticket, throw error
        if (!ticket) {
            throw new Error("Ticket not found");
        }

        // Mark the ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id });

        // Save the ticket
        await ticket.save();
    }
}
