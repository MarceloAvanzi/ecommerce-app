import amqp from 'amqplib';
import Checkout from './application/Checkout';
import ProductDataDatabase from './infrastructure/data/ProductDataDatabase';
import CouponDataDatabase from './infrastructure/data/CouponDataDatabase';
import OrderDataDatabase from './infrastructure/data/OrderDataDatabase';
import PgPromiseConnection from './infrastructure/database/PgPromiseConnection';

async function init() {
    const connectionQueue = await amqp.connect('amqp://localhost');
    const channel = await connectionQueue.createChannel();
    await channel.assertQueue('checkout', { durable: true });
    await channel.consume('checkout', async function (message: any) {
        const input = JSON.parse(message.content.toString());

        try {
            const connection = new PgPromiseConnection();
            const productData = new ProductDataDatabase(connection);
            const couponData = new CouponDataDatabase(connection);
            const orderData = new OrderDataDatabase(connection);
            const checkout = new Checkout(productData, couponData, orderData);
            const output = await checkout.execute(input);
            console.log(output);
        } catch (error: any) {
            console.log(error.message);
        }
        channel.ack(message);
    });
}

init();