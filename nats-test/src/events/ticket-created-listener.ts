 import { Channel, ConsumeMessage } from "amqplib";
 import { Listener } from "./base-listener";
 import { TicketCreatedEvent } from "./ticket-created-event";
 import { Subjects } from "./subjects";

 export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
     readonly subject = Subjects.TicketCreated;

     onMessage(data: TicketCreatedEvent["data"], msg: ConsumeMessage) {
         console.log("Event data!", data);

         console.log(data.id);
         console.log(data.title);
         console.log(data.price);
     }
 }
