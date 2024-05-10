import Order from "../src/Order"

test('Deve criar um pedido vazio com CPF valido', function () {
    const order = new Order('987.654.321-00')
    expect(order.getTotal()).toBe(0)
})

test('Nao deve criar um pedido com CPF invalido', function () {
    expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid CPF'))
})