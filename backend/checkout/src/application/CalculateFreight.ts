import FreightCalculator from "../domain/entities/FreightCalculator";
import ProductData from "../domain/data/ProductData";
import ZipcodeData from "../domain/data/ZipcodeData";
import DistanceCalculator from "../domain/entities/DistanceCalculator";

type Input = {
    from?: string,
    to?: string,
    items: { idProduct: number, quantity: number }[]
}

type Output = {
    total: number
}

export default class CalculateFreight {
    constructor(readonly productData: ProductData, readonly zipcodeData: ZipcodeData) { }

    async execute(input: Input): Promise<Output> {
        let distance;
        if (input.from && input.to) {
            const from = await this.zipcodeData.get(input.from);
            const to = await this.zipcodeData.get(input.to);
            if(from && to) {
                distance = DistanceCalculator.calculate(from.coord, to.coord)
            }
        }
        let total = 0;
        for (const item of input.items) {
            const product = await this.productData.getProduct(item.idProduct);
            total += FreightCalculator.calculate(product, distance) * item.quantity;
        };
        return {
            total
        };
    }
}