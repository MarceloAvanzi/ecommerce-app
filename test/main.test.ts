import { validateCpf } from "../src/main";

const validCpfs = [
    '987.654.321-00',
    '714.602.380-01',
    '313.030.210-72',
    '144.796.170-60'
]

test.each(validCpfs)('Deve testar um cpf valido: %s', function (cpf: string) {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeTruthy();
})

const invalidCpfs = [
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33',
    '444.444.444-44',
    '555.555.555-55',
    '666.666.666-66',
    '777.777.777-77',
    '888.888.888-88',
    '999.999.999-99',
]

test.each(invalidCpfs)('Deve testar um cpf invalido: %s', function (cpf: string) {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeFalsy();
})

test('Deve testar um cpf undefined', function() {
    const isValid = validateCpf(undefined);
    expect(isValid).toBeFalsy();
})

test('Deve testar um cpf null', function() {
    const isValid = validateCpf(null);
    expect(isValid).toBeFalsy();
})

test('Deve testar um cpf com tamanho errado', function() {
    const isValid = validateCpf('123');
    expect(isValid).toBeFalsy();
})
