import Checkout from "./application/Checkout";
import CLIController from "./infrastructure/cli/CLIController";
import CLIHandler from "./infrastructure/cli/CLIHandler";
import CouponDataDatabase from "./infrastructure/data/CouponDataDatabase";
import OrderDataDatabase from "./infrastructure/data/OrderDataDatabase";
import ProductDataDatabase from "./infrastructure/data/ProductDataDatabase";
import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";

const connection = new PgPromiseConnection();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const checkout = new Checkout(productData, couponData, orderData);
const handler = new CLIHandler();
new CLIController(handler, checkout);