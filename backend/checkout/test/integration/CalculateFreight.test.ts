import ProductDataDatabase from "../../src/infrastructure/data/ProductDataDatabase";
import CalculateFreight from "../../src/application/CalculateFreight";
import PgPromiseConnection from "../../src/infrastructure/database/PgPromiseConnection";
import ZipcodeData from "../../src/domain/data/ZipcodeData";
import Zipcode from "../../src/domain/entities/Zipcode";

test('Deve simular o frete para um pedido sem CEP de origem e destino', async function () {
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const zipcodeData: ZipcodeData = {
        async get(code: string): Promise<Zipcode | undefined> {
            if (code === '22030060') {
                return new Zipcode('22030060', '', '', -27.5945, -48.5477)
            }
            if (code === '88015600') {
                return new Zipcode('88015600', '', '', -22.9129, -43.2003)
            }
        }
    }
    const calculateFreight = new CalculateFreight(productData, zipcodeData);
    const input = {
        items: [
            { idProduct: 1, quantity: 1 }
        ]
    };
    const output = await calculateFreight.execute(input);
    expect(output.total).toBe(30);
    await connection.close();
})

test('Deve simular o frete para um pedido com CEP de origem e destino', async function () {
    const connection = new PgPromiseConnection();
    const productData = new ProductDataDatabase(connection);
    const zipcodeData: ZipcodeData = {
        async get(code: string): Promise<Zipcode | undefined> {
            if (code === '22030060') {
                return new Zipcode('22030060', '', '', -27.5945, -48.5477)
            }
            if (code === '88015600') {
                return new Zipcode('88015600', '', '', -22.9129, -43.2003)
            }
        }
    }
    const calculateFreight = new CalculateFreight(productData, zipcodeData);
    const input = {
        from: '22030060',
        to: '88015600',
        items: [
            { idProduct: 1, quantity: 1 }
        ]
    };
    const output = await calculateFreight.execute(input);
    expect(output.total).toBe(22.45);
    await connection.close();
})