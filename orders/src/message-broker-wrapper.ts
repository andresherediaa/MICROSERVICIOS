import amqp from "amqplib";

class MessageBrokerWrapper {
    private _client?: amqp.Channel;

    get client() {
        if (!this._client) {
            throw new Error(
                "Cannot access Message Broker client before connecting"
            );
        }
        return this._client;
    }

    async connectRabbitMQ(url: string) {
        const connection = await amqp.connect(url);
        this._client = await connection.createChannel();
        console.log("Connected to RabbitMQ");
    }
}

export const messageBrokerWrapper = new MessageBrokerWrapper();
