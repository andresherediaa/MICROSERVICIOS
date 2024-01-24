import { Publisher, OrderCreatedEvent, Subjects } from '@munlib/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
