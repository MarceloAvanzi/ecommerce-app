import PgPromiseConnection from "./infrastructure/database/PgPromiseConnection";
import ExpressHttpServer from "./infrastructure/http/ExpressHttpServer";
import RestController from "./infrastructure/controller/RestController";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
new RestController(httpServer);
httpServer.listen(3003)