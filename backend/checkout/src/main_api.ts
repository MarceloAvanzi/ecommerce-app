import Checkout from "./application/Checkout";
import ProductDataDatabase from "./infrastructure/data/ProductDataDatabase";
import CouponDataDatabase from "./infrastructure/data/CouponDataDatabase";
import OrderDataDatabase from "./infrastructure/data/OrderDataDatabase";
import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";
import ExpressHttpServer from "./infrastructure/http/ExpressHttpServer";
import RestController from "./infrastructure/controller/RestController";
import FreightGatewayHttp from "./infrastructure/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "./infrastructure/gateway/CatalogGatewayHttp";
import StockGatewayHttp from "./infrastructure/gateway/StockGatewatHttp";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const freightGateway = new FreightGatewayHttp();
const catalogGateway = new CatalogGatewayHttp()
const stockGateway = new StockGatewayHttp();
const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway, stockGateway);
new RestController(httpServer, checkout);
httpServer.listen(3000);