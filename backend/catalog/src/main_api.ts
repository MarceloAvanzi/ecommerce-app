import ProductDataDatabase from "./infrastructure/data/ProductDataDatabase";
import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";
import ExpressHttpServer from "./infrastructure/http/ExpressHttpServer";
import RestController from "./infrastructure/controller/RestController";
import GetProduct from "./application/GetProduct";
import GetProducts from "./application/GetProducts";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const productData = new ProductDataDatabase(connection);
const getProduct = new GetProduct(productData);
const getProducts = new GetProducts(productData);

new RestController(httpServer, getProducts, getProduct);
httpServer.listen(3002);