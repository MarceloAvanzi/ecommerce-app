import Coupon from "../src/Coupon"
import Order from "../src/Order"
import Product from "../src/Product"

test('Deve criar um pedido vazio com CPF valido', function () {
    const order = new Order('987.654.321-00')
    expect(order.getTotal()).toBe(0)
})

test('Nao deve criar um pedido com CPF invalido', function () {
    expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid CPF'))
})

test('Deve criar um pedido com 3 itens', function () {
    const order = new Order('987.654.321-00')
    order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3), 1)
    order.addItem(new Product(2, 'B', 5000, 50, 50, 50, 22), 1)
    order.addItem(new Product(3, 'C', 30, 10, 10, 10, 1), 3)

    expect(order.getTotal()).toBe(6350)
})

test('Deve criar um pedido com 3 itens com cupom de desconto', function () {
    const order = new Order('987.654.321-00')
    order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3), 1)
    order.addItem(new Product(2, 'B', 5000, 50, 50, 50, 22), 1)
    order.addItem(new Product(3, 'C', 30, 10, 10, 10, 1), 3)
    order.addCoupon(new Coupon('VALE20', 20, new Date('2024-12-10T10:00:00')))
    expect(order.getTotal()).toBe(5132)
})

test('Não deve criar um pedido com item com quantidade negativa', function () {
    const order = new Order('987.654.321-00')
    expect(() => order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3), -1)).toThrow(new Error('Quantity must be positive'))
})

test('Não deve criar um pedido com item duplicado', function () {
    const order = new Order('987.654.321-00')
    order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3), 1)
    expect(() => order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3), 1)).toThrow(new Error('Duplicated Product'))
})

test('Deve criar um pedido com 3 itens com codigo', function () {
    const order = new Order('987.654.321-00', new Date('2024-12-10T10:00:00'), 1)
    order.addItem(new Product(1, 'A', 1000, 100, 30, 10, 3), 1)
    order.addItem(new Product(2, 'B', 5000, 50, 50, 50, 22), 1)
    order.addItem(new Product(3, 'C', 30, 10, 10, 10, 1), 3)
    expect(order.getCode()).toBe('202400000001')
})