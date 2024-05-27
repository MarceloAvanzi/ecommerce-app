import Checkout from "../src/application/Checkout";
import CLIController from "../src/infrastructure/cli/CLIController";
import CLIHandler from "../src/infrastructure/cli/CLIHandler";
import CouponDataDatabase from "../src/infrastructure/data/CouponDataDatabase";
import OrderDataDatabase from "../src/infrastructure/data/OrderDataDatabase";
import ProductDataDatabase from "../src/infrastructure/data/ProductDataDatabase";
import PgPromiseConnection from "../src/infrastructure/database/PgPromiseConnection";
import sinon from 'sinon';

test('Deve testar o cli', async function () {
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const couponData = new CouponDataDatabase(connection);
    const orderData = new OrderDataDatabase(connection);
    const checkout = new Checkout(productData, couponData, orderData);
    const checkoutSpy = sinon.spy(checkout, 'execute');
    const handler = new CLIHandler();
    new CLIController(handler, checkout);
    await handler.type('set-cpf 987.654.321-00');
    await handler.type('add-item 1 1');
    await handler.type('checkout');
    const [returnValue] = checkoutSpy.returnValues;
    const output = await returnValue;
    expect(output.code).toBe('202400000001');
    expect(output.total).toBe(1030);
    checkoutSpy.restore();
})