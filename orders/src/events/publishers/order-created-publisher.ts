import { Publisher, OrderCreatedEvent, Subjects } from '@munlib/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
    async publish(data: OrderCreatedEvent["data"]): Promise<void> {
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

