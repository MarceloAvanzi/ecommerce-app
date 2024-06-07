import Checkout from './application/Checkout';
import ProductDataDatabase from './infrastructure/data/ProductDataDatabase';
import CouponDataDatabase from './infrastructure/data/CouponDataDatabase';
import OrderDataDatabase from './infrastructure/data/OrderDataDatabase';
import PgPromiseConnection from './infrastructure/database/PgPromiseConnection';
import RabbitMQAdapter from './infrastructure/queue/RabbitMQAdapter';
import QueueController from './infrastructure/queue/QueueController';
import ZipcodeDataDatabase from './infrastructure/data/ZipcodeDataDatabase';

async function init() {
    const queue = new RabbitMQAdapter();
    await queue.connect();
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const couponData = new CouponDataDatabase(connection);
    const orderData = new OrderDataDatabase(connection);
    const zipcodeData = new ZipcodeDataDatabase(connection);
    const checkout = new Checkout(productData, couponData, orderData, zipcodeData);
    new QueueController(queue, checkout);
}

init();