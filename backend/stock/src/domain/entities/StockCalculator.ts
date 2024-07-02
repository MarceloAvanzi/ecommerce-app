import StockEntry from "./StockEntry";

export default class StockCalculator {

    static calculate(stockEntries: StockEntry[]) {
        let total = 0;

        for (const StockEntry of stockEntries) {
            if (StockEntry.operation === 'in') total += StockEntry.quantity;
            if (StockEntry.operation === 'out') total -= StockEntry.quantity;
        }

        return total
    }
}