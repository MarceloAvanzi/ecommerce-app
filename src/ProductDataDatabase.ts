import ProductData from "./ProductData";
import pgp from 'pg-promise';

export default class ProductDataDatabase implements ProductData {
    async getProduct(idProduct: number): Promise<any> {
        const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
        const [product] = await connection.query('select * from eccommerce_app.product where id_product = $1', [idProduct]);
        await connection.$pool.end()
        return product;
    }
}