import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";
import ExpressHttpServer from "./infrastructure/http/ExpressHttpServer";
import RestController from "./infrastructure/controller/RestController";
import ZipcodeDataDatabase from "./infrastructure/data/ZipcodeDataDatabase";
import CalculateFreight from "./application/CalculateFreight";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const zipcodeData = new ZipcodeDataDatabase(connection);
const calculateFreight = new CalculateFreight(zipcodeData);
new RestController(httpServer, calculateFreight);
httpServer.listen(3000);