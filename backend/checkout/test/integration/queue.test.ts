import sinon from "sinon";
import Checkout from "../../src/application/Checkout";
import CouponDataDatabase from "../../src/infrastructure/data/CouponDataDatabase";
import OrderDataDatabase from "../../src/infrastructure/data/OrderDataDatabase";
import ProductDataDatabase from "../../src/infrastructure/data/ProductDataDatabase";
import PgPromiseConnection from "../../src/infrastructure/database/PgPromiseConnection";
import QueueController from "../../src/infrastructure/queue/QueueController";
import QueueMemory from "../../src/infrastructure/queue/QueueMemory";
import FreightGatewayHttp from "../../src/infrastructure/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "../../src/infrastructure/gateway/CatalogGatewayHttp";

test('Deve testar com a fila', async function () {
    const queue = new QueueMemory();
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const couponData = new CouponDataDatabase(connection);
    const orderData = new OrderDataDatabase(connection);
    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp()
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
    const checkoutSpy = sinon.spy(checkout, 'execute');
    new QueueController(queue, checkout);
    const input = {
        cpf: '987.654.321-00',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ]
    };

    await queue.publish('checkout', input);
    const [returnValue] = checkoutSpy.returnValues;
    const output = await returnValue;
    expect(output.code).toBe('202400000001')
    expect(output.total).toBe(6370)
    checkoutSpy.restore();
});