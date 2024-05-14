import Order from "./Order";
import OrderData from "./OrderData";
import pgp from 'pg-promise'

export default class OrderDataDatabase implements OrderData {
    async save(order: Order): Promise<void> {
        const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
        await connection.query('insert into eccommerce_app.order (cpf, total) values ($1, $2)', [order.cpf.getValue(), order.getTotal()]);
        await connection.$pool.end()
    }
    async getByCpf(cpf: string): Promise<any> {
        const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
        const [orderData] = await connection.query('select * from eccommerce_app.order where cpf = $1', [cpf]);
        await connection.$pool.end()
        return orderData;
    }
    async count(): Promise<number> {
        const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
        const [options] = await connection.query('select count(*)::integer as count from eccommerce_app.order', []);
        await connection.$pool.end()
        return options.count;
    }
}