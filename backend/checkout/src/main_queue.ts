import Checkout from './application/Checkout';
import ProductDataDatabase from './infrastructure/data/ProductDataDatabase';
import CouponDataDatabase from './infrastructure/data/CouponDataDatabase';
import OrderDataDatabase from './infrastructure/data/OrderDataDatabase';
import PgPromiseConnection from './infrastructure/database/PgPromiseConnection';
import RabbitMQAdapter from './infrastructure/queue/RabbitMQAdapter';
import QueueController from './infrastructure/queue/QueueController';
import FreightGatewayHttp from './infrastructure/gateway/FreightGatewayHttp';
import CatalogGatewayHttp from './infrastructure/gateway/CatalogGatewayHttp';
import StockGatewayHttp from './infrastructure/gateway/StockGatewatHttp';

async function init() {
    const queue = new RabbitMQAdapter();
    await queue.connect();
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const couponData = new CouponDataDatabase(connection);
    const orderData = new OrderDataDatabase(connection);
    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const stockGateway = new StockGatewayHttp();
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway, stockGateway);
    new QueueController(queue, checkout);
}

init();