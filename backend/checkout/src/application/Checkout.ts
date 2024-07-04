import CouponData from "../domain/data/CouponData";
import CurrencyGatewayRandom from "../infrastructure/gateway/CurrencyGatewayRandom";
import CurrencyGateway from "../infrastructure/gateway/CurrencyGatewayRandom";
import Order from "../domain/entities/Order";
import OrderData from "../domain/data/OrderData";
import FreightGateway from "../infrastructure/gateway/FreightGateway";
import CatalogGateway from "../infrastructure/gateway/CatalogGateway";
import StockGateway from "../infrastructure/gateway/StockGateway";

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
        readonly catalogGateway: CatalogGateway,
        readonly couponData: CouponData,
        readonly orderData: OrderData,
        readonly freightGateway: FreightGateway,
        readonly stockGateway: StockGateway,
        readonly currencyGateway: CurrencyGateway = new CurrencyGatewayRandom(),
    ) { }

    async execute(input: Input) {
        const currencies = await this.currencyGateway.getCurrencies()
        const order = new Order(input.cpf)
        const freightItems: { volume: number, density: number, quantity: number }[] = [];

        for (const item of input.items) {
            const product = await this.catalogGateway.getProduct(item.idProduct)
            order.addItem(product, item.quantity, product.currency, currencies.getCurrency(product.currency))
            freightItems.push({ volume: product.getVolume(), density: product.getDensity(), quantity: item.quantity })
        }

        const freight = await this.freightGateway.calculateFreight(freightItems, input.from, input.to);
        order.freight = freight.total;

        if (input.coupon) {
            const coupon = await this.couponData.getCoupon(input.coupon)
            order.addCoupon(coupon)
        }

        await this.orderData.save(order)
        await this.stockGateway.decreaseStock(input);
        return {
            code: order.getCode(),
            total: order.getTotal(),
        };
    };
}
