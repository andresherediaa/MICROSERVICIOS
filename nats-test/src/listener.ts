import amqp, { Channel, Connection } from "amqplib";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const startListening = async (channel: Channel) => {
    const listener = new TicketCreatedListener(channel);
    await listener.listen();
};

const connectToRabbitMQ = async () => {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    process.on("SIGINT", async () => {
        await connection.close();
        process.exit();
    });

    process.on("SIGTERM", async () => {
        await connection.close();
        process.exit();
    });

    console.log("Listener connected to RabbitMQ");

    await startListening(channel);
};

connectToRabbitMQ();
