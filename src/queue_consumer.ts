import amqp from 'amqplib';
import { validate } from './cpfValidator';
import pgp from 'pg-promise';

async function init() {
    const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
    const connectionQueue = await amqp.connect('amqp://localhost');
    const channel = await connectionQueue.createChannel();
    await channel.assertQueue('checkout', { durable: true });
    await channel.consume('checkout', async function (message: any) {
        const input = JSON.parse(message.content.toString());

        const isValid = validate(input.cpf);
        if (!isValid) {
            console.log('Invalid cpf');
            return;
        };

        let total = 0;
        let freight = 0;
        const productsIds: number[] = [];
        for (const item of input.items) {
            if (productsIds.some(idProduct => idProduct === item.idProduct)) {
                console.log('Duplicated Product');
                return;
            }
            productsIds.push(item.idProduct);
            // const product = products.find((product) => product.idProduct === item.idProduct);
            const [product] = await connection.query('select * from eccommerce_app.product where id_product = $1', [item.idProduct]);
            if (product) {
                if (item.quantity <= 0) {
                    console.log('Quantity must be positive');
                    return;
                }
                total += parseFloat(product.price) * item.quantity;
                const volume = (product.width / 100) * (product.height / 100) * (product.length / 100);
                const density = parseFloat(product.weight) / volume;
                const itemFreight = 1000 * volume * (density / 100);
                freight += (itemFreight >= 10) ? itemFreight : 10;
            } else {
                console.log('Product not found');
                return;
            };
        };

        if (input.coupon) {
            // const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
            const [coupon] = await connection.query('select * from eccommerce_app.coupons where code = $1', [input.coupon])
            const today = new Date();
            if (coupon && (coupon.expire_date.getTime() > today.getTime())) {
                total -= (total * coupon?.percentage) / 100;
            }
        }

        total += freight;
        console.log({ total });
        channel.ack(message);
    });
}

init();