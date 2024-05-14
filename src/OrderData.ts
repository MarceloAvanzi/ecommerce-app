import Order from "./Order";

export default interface OrderData {
    save(order: Order): Promise<void>;
    getByCpf(cpf: string): Promise<any>;
    count(): Promise<number>;
}