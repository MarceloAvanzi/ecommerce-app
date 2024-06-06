import ProductDataDatabase from "../../src/infrastructure/data/ProductDataDatabase";
import CalculateFreight from "../../src/application/CalculateFreight";
import PgPromiseConnection from "../../src/infrastructure/database/PgPromiseConnection";

test('Deve simular o frete para um pedido', async function () {
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const calculateFreight = new CalculateFreight(productData);
    const input = {
        items: [
            {idProduct: 1, quantity: 1}
        ]
    };
    const output = await calculateFreight.execute(input);
    expect(output.total).toBe(30);
})