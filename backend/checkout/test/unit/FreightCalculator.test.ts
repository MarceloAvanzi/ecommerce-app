import FreightCalculator from "../../src/domain/entities/FreightCalculator"
import Product from "../../src/domain/entities/Product"

test('Deve calcular o frete com distancia padrao', function () {
    const product = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const freight = FreightCalculator.calculate(product)
    expect(freight).toBe(30)
})

test('Deve calcular o frete com distancia padrao', function () {
    const product = new Product(2, 'B', 1000, 50, 50, 50, 22);
    const freight = FreightCalculator.calculate(product)
    expect(freight).toBe(220)
})

test('Deve calcular o frete minimo', function () {
    const product = new Product(3, 'C', 10, 10, 10, 10, 0.9)
    const freight = FreightCalculator.calculate(product)
    expect(freight).toBe(10)
})

test('Deve calcular o frete com distancia variavel', function () {
    const product = new Product(1, 'A', 1000, 100, 30, 10, 3);
    const distance = 748.2217780081631;
    const freight = FreightCalculator.calculate(product, distance)
    expect(freight).toBe(22.45)
})