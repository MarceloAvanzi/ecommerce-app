import Coupon from "./Coupon";
import CouponData from "./CouponData";
import CurrencyGatewayRandom from "./CurrencyGatewayRandom";
import CurrencyGateway from "./CurrencyGatewayRandom";
import FreightCalculator from "./FreightCalculator";
import MailerConsole from "./MailerConsole";
import Mailer from "./MailerConsole";
import Order from "./Order";
import OrderCode from "./OrderCode";
import OrderData from "./OrderData";
import ProductData from "./ProductData";
import { validate } from "./cpfValidator";
// import { getCoupon, getProduct } from "./resource";

type Input = {
    cpf: string,
    email?: string,
    items: { idProduct: number, quantity: number }[],
    coupon?: string,
};

export default class Checkout {

    constructor(
        readonly productData: ProductData,
        readonly couponData: CouponData,
        readonly orderData: OrderData,
        readonly currencyGateway: CurrencyGateway = new CurrencyGatewayRandom(),
        readonly mailer: Mailer = new MailerConsole(),
    ) { }

    async execute(input: Input) {
        const currencies = await this.currencyGateway.getCurrencies()
        const order = new Order(input.cpf)
        for (const item of input.items) {
            const product = await this.productData.getProduct(item.idProduct)
            order.addItem(product, item.quantity, product.currency, currencies.getCurrency(product.currency))
        }
        if (input.coupon) {
            const coupon = await this.couponData.getCoupon(input.coupon)
            order.addCoupon(coupon)
        }

        await this.orderData.save(order)
        return {
            code: order.getCode(),
            total: order.getTotal(),
        };
    };
}
