import ProductDataDatabase from "../src/ProductDataDatabase";
import SimulateFreight from "../src/SimulateFreight";

test('Deve simular o frete para um pedido', async function () {
    const productData = new ProductDataDatabase;
    const simulateFreight = new SimulateFreight(productData);
    const input = {
        items: [
            {idProduct: 1, quantity: 1}
        ]
    };
    const output = await simulateFreight.execute(input);
    expect(output.total).toBe(30);
})