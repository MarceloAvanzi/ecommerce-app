import express from "express";
import { validate } from "./cpfValidator";
import pgp from 'pg-promise';
const app = express();
app.use(express.json());

const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
if (connection) console.log('Database Postgres connected')

// const products = [
//     { idProduct: 1, description: "A", price: 1000 },
//     { idProduct: 2, description: "B", price: 5000 },
//     { idProduct: 3, description: "C", price: 30 },
// ];

// const coupons = [
//     { code: "VALE20", percentage: 20 }
// ];

app.post('/checkout', async function (req, res) {
    const isValid = validate(req.body.cpf);
    if (!isValid) {
        return res.status(422).json({
            message: 'Invalid cpf'
        });
    };

    let total = 0;
    let freight = 0;
    const productsIds: number[] = [];
    for (const item of req.body.items) {
        if (productsIds.some(idProduct => idProduct === item.idProduct)) {
            return res.status(422).json({
                message: 'Duplicated Product'
            });
        }
        productsIds.push(item.idProduct);
        // const product = products.find((product) => product.idProduct === item.idProduct);
        const [product] = await connection.query('select * from eccommerce_app.product where id_product = $1', [item.idProduct]);
        if (product) {
            if (item.quantity <= 0) {
                return res.status(422).json({
                    message: 'Quantity must be positive'
                });
            }
            total += parseFloat(product.price) * item.quantity;
            const volume = (product.width/100) * (product.height/100) * (product.length/100);
            const density = parseFloat(product.weight)/volume;
            const itemFreight = 1000 * volume * (density/100);
            freight += (itemFreight >= 10) ? itemFreight : 10;
        } else {
            return res.status(422).json({
                message: 'Product not found'
            });
        };
    };

    if (req.body.coupon) {
        // const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
        const [coupon] = await connection.query('select * from eccommerce_app.coupons where code = $1', [req.body.coupon])
        const today = new Date();
        if (coupon && (coupon.expire_date.getTime() > today.getTime())) {
            total -= (total * coupon?.percentage) / 100;
        }
    }

    total += freight;
    res.json({
        total,
    });
})
app.listen(3001, () => {
    console.log('Server Running on PORT 3001');
});