import { Subjects, Publisher, OrderCancelledEvent } from '@munlib/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
