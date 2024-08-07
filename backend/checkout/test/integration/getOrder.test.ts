import Checkout from "../../src/application/Checkout"
import CouponDataDatabase from "../../src/infrastructure/data/CouponDataDatabase";
import GetOrderByCpf from "../../src/application/GetOrderByCpf";
import OrderDataDatabase from "../../src/infrastructure/data/OrderDataDatabase";
import ProductDataDatabase from "../../src/infrastructure/data/ProductDataDatabase";
import PgPromiseConnection from "../../src/infrastructure/database/PgPromiseConnection";
import FreightGatewayHttp from "../../src/infrastructure/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "../../src/infrastructure/gateway/CatalogGatewayHttp";
import StockGatewayHttp from "../../src/infrastructure/gateway/StockGatewatHttp";

test('Deve consultar um pedido', async function () {
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const couponData = new CouponDataDatabase(connection);
    const orderData = new OrderDataDatabase(connection);
    const freightGateway = new FreightGatewayHttp();
    const catalogGateway = new CatalogGatewayHttp();
    const stockGateway = new StockGatewayHttp();
    const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway, stockGateway);
    const input = {
        cpf: '987.654.321-00',
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ]
    };
    await checkout.execute(input);

    const getorderByCpf = new GetOrderByCpf(orderData);
    const output = await getorderByCpf.execute('987.654.321-00');
    expect(output.total).toBe(6370);
    await connection.close()
})