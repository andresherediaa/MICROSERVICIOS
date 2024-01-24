import { Publisher, Subjects, TicketUpdatedEvent } from "@munlib/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
