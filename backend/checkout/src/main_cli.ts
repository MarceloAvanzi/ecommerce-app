import Checkout from "./application/Checkout";
import CLIController from "./infrastructure/cli/CLIController";
import CLIHandlerNode from "./infrastructure/cli/CLIHandlerNode";
import CouponDataDatabase from "./infrastructure/data/CouponDataDatabase";
import OrderDataDatabase from "./infrastructure/data/OrderDataDatabase";
import ProductDataDatabase from "./infrastructure/data/ProductDataDatabase";
import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";
import CatalogGatewayHttp from "./infrastructure/gateway/CatalogGatewayHttp";
import FreightGatewayHttp from "./infrastructure/gateway/FreightGatewayHttp";

const connection = new PgPromiseConnection();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const freightGateway = new FreightGatewayHttp();
const catalogGateway = new CatalogGatewayHttp()
const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway);
const handler = new CLIHandlerNode();
new CLIController(handler, checkout);