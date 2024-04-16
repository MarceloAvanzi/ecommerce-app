import express from "express";
import { validate } from "./cpfValidator";
const app = express();
app.use(express.json());
app.post('/checkout', function(req, res) {
    const isValid = validate(req.body.cpf);
    if(!isValid){
        res.status(422).json({
            message: 'Invalid cpf'
        })
    } else {
        res.end();
    }
})
app.listen(3001);