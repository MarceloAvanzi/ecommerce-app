import Checkout from "../../application/Checkout";
import Queue from "./Queue";

export default class QueueController {

    constructor(readonly queue: Queue, readonly checkout: Checkout) {
        queue.on('checkout', async function (input: any) {
            const output = await checkout.execute(input);
            console.log(output);
        })
    }
}