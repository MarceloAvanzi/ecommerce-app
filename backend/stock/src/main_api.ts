import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";
import ExpressHttpServer from "./infrastructure/http/ExpressHttpServer";
import RestController from "./infrastructure/controller/RestController";
import StockEntryRepositoryDatabase from "./infrastructure/repository/StockEntryRepositoryDatabase";
import IncreaseStock from "./application/IncreaseStock";
import DecreaseStock from "./application/DecreaseStock";
import CalculateStock from "./application/CalculateStock";
import CleanStock from "./application/CleanStock";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
const calculateStock = new CalculateStock(stockEntryRepository);
const increaseStock = new IncreaseStock(stockEntryRepository);
const decreaseStock = new DecreaseStock(stockEntryRepository);
const cleanStock = new CleanStock(stockEntryRepository);
new RestController(httpServer, calculateStock, increaseStock, decreaseStock, cleanStock);
httpServer.listen(3003)