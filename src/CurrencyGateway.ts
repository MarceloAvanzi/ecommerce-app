import Currencies from "./Currencies";

export default interface CurrencyGateway {
    getCurrencies(): Promise<Currencies>;
}