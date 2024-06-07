import Checkout from "./application/Checkout";
import ProductDataDatabase from "./infrastructure/data/ProductDataDatabase";
import CouponDataDatabase from "./infrastructure/data/CouponDataDatabase";
import OrderDataDatabase from "./infrastructure/data/OrderDataDatabase";
import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";
import ExpressHttpServer from "./infrastructure/http/ExpressHttpServer";
import RestController from "./infrastructure/controller/RestController";
import ZipcodeDataDatabase from "./infrastructure/data/ZipcodeDataDatabase";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const zipcodeData = new ZipcodeDataDatabase(connection);
const checkout = new Checkout(productData, couponData, orderData, zipcodeData);
new RestController(httpServer, checkout);
httpServer.listen(3000);