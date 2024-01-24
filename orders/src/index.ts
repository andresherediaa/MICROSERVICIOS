import mongoose from 'mongoose';
import { app } from './app';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
//import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { messageBrokerWrapper } from "./message-broker-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.MESSAGE_BROKER_URL) {
      throw new Error("MESSAGE_BROKER_URL must be defined");
  }
  try {
    await messageBrokerWrapper.connectRabbitMQ(process.env.MESSAGE_BROKER_URL);
    new TicketCreatedListener(messageBrokerWrapper.client).listen();
    //new TicketUpdatedListener(natsWrapper.client).listen();
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
