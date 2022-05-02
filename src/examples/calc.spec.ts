// Primeiro arquivo de testes
export function add(x: number, y: number) {
    return x + y;
}

// describe recebe 2 parametros e pode ser criado um conjunto de testes
// primeiro com uma descrição
// segundo pode ser uma função anonima com os testes
describe('Initial test', () => {
    // test: possui 2 parametros também, 1 descrição, 2 função anonima tbm
    test('add function', () => {
        expect(add(1, 2)).toEqual(3);
    });
});
