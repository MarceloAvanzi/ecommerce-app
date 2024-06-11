import FreightCalculator from "../../src/domain/entities/FreightCalculator"

test('Deve calcular o frete com distancia padrao', function () {
    const freight = FreightCalculator.calculate(0.03, 100)
    expect(freight).toBe(30)
})

test('Deve calcular o frete com distancia padrao', function () {
    const freight = FreightCalculator.calculate(0.125, 176)
    expect(freight).toBe(220)
})

test('Deve calcular o frete minimo', function () {
    const freight = FreightCalculator.calculate(0.01, 100)
    expect(freight).toBe(10)
})

test('Deve calcular o frete com distancia variavel', function () {
    const distance = 748.2217780081631;
    const freight = FreightCalculator.calculate(0.03, 100, distance)
    expect(freight).toBe(22.45)
})