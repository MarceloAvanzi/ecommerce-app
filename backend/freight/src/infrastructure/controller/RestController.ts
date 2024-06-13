import CalculateFreight from "../../application/CalculateFreight";
import HttpServer from "../http/HttpServer";

export default class RestController {
    constructor(readonly httpServer: HttpServer, readonly calculateFreght: CalculateFreight) {
        httpServer.on('post', '/calculate_freight', async function (params: any, body: any) {
            const output = await calculateFreght.execute(body);
            return output;
        });
    };
}