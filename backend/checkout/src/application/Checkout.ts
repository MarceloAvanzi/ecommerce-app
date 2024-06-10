import CouponData from "../domain/data/CouponData";
import CurrencyGatewayRandom from "../infrastructure/gateway/CurrencyGatewayRandom";
import CurrencyGateway from "../infrastructure/gateway/CurrencyGatewayRandom";
import MailerConsole from "../infrastructure/mailer/MailerConsole";
import Mailer from "../infrastructure/mailer/MailerConsole";
import Order from "../domain/entities/Order";
import OrderData from "../domain/data/OrderData";
import ProductData from "../domain/data/ProductData";
import CalculateFreight from "./CalculateFreight";

type Input = {
    from?: string,
    to?: string,
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
        readonly calculateFreight: CalculateFreight,
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

        const freight = await this.calculateFreight.execute({ from: input.from, to: input.to, items: input.items });
        order.freight = freight.total;

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
