import Product from "./Product";

export default interface ProductData {
    getProduct(idProduct: number): Promise<Product>;
}