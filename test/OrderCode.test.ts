import OrderCode from "../src/domain/entities/OrderCode"

test('Deve criar um codigo para o pedido', function () {
    const orderCode = new OrderCode(new Date('2024-12-10T10:00:00'), 1)
    expect(orderCode.getValue()).toBe('202400000001')
})

test('Nao deve criar um codigo para o pedido se a sequence for negativa', function () {
    expect(() => new OrderCode(new Date('2024-12-10T10:00:00'), -1)).toThrow(new Error('Invalid Sequence'))
})