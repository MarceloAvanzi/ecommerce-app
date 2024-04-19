import express from "express";
import { validate } from "./cpfValidator";
import pgp from 'pg-promise';
const app = express();
app.use(express.json());

const connection = pgp()('postgres://app:app@localhost:5432/eccommerce_app');
if (connection) console.log('Database Postgres connected')

const products = [
    { idProduct: 1, description: "A", price: 1000 },
    { idProduct: 2, description: "B", price: 5000 },
    { idProduct: 3, description: "C", price: 30 },
];

const coupons = [
    { code: "VALE20", percentage: 20 }
];

app.post('/checkout', function (req, res) {
    const isValid = validate(req.body.cpf);
    if (!isValid) {
        return res.status(422).json({
            message: 'Invalid cpf'
        });
    };

    let total = 0;
    for (const item of req.body.items) {
        const product = products.find((product) => product.idProduct === item.idProduct);
        if (product) {
            total += product.price * item.quantity;
        } else {
            return res.status(422).json({
                message: 'Product not found'
            });
        };
    };

    if (req.body.coupon) {
        const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
        if (coupon) {
            total -= (total * coupon?.percentage) / 100;
        }
    }

    res.json({
        total,
    });
})
app.listen(3001, () => {
    console.log('Server Running on PORT 3001');
});