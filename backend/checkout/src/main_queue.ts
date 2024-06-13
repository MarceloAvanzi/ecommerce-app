import Checkout from './application/Checkout';
import ProductDataDatabase from './infrastructure/data/ProductDataDatabase';
import CouponDataDatabase from './infrastructure/data/CouponDataDatabase';
import OrderDataDatabase from './infrastructure/data/OrderDataDatabase';
import PgPromiseConnection from './infrastructure/database/PgPromiseConnection';
import RabbitMQAdapter from './infrastructure/queue/RabbitMQAdapter';
import QueueController from './infrastructure/queue/QueueController';
import FreightGatewayHttp from './infrastructure/gateway/FreightGatewayHttp';

async function init() {
    const queue = new RabbitMQAdapter();
    await queue.connect();
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const couponData = new CouponDataDatabase(connection);
    const orderData = new OrderDataDatabase(connection);
    const freightGateway = new FreightGatewayHttp();
    const checkout = new Checkout(productData, couponData, orderData, freightGateway);
    new QueueController(queue, checkout);
}

init();