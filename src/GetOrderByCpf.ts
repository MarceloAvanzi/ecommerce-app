import OrderData from "./OrderData";

type Output = {
    total: number
}

export default class GetOrderByCpf {
    constructor(readonly orderData: OrderData) { }

    async execute(cpf: string): Promise<Output> {
        const order = await this.orderData.getByCpf(cpf);
        return {
            total: parseFloat(order.total)
        }
    }
}
