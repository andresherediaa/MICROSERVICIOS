// publisher.ts
import * as amqp from "amqplib";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const start = async () => {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    //await channel.assertQueue("ticket-created"); // Debes crear la cola antes de publicar
    const publisher = new TicketCreatedPublisher(channel);

    try {
        await publisher.publish({
            id: "123",
            title: "concert",
            price: 20,
        });
    } catch (err) {
        console.error(err);
    }

   await channel.close();
   ///await connection.close();
};

start();
