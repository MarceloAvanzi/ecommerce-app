import axios from "axios";

axios.defaults.validateStatus = function() {
    return true;
}

test('Não deve fazer um pedido com cpf inválido', async function (){
    const input = {
        cpf: '987.654.321-01'
    };
    const response = await axios.post('http://localhost:3001/checkout', input)
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe('Invalid cpf');
})