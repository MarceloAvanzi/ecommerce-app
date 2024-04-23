import amqp from 'amqplib';

async function init() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('checkout', { durable: true });
    await channel.consume('checkout', async function (message: any) {
        console.log(message.content.toString());
        channel.ack(message);
    });
}

init();