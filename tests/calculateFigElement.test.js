import { calculateFigElement } from '../src/index.js';

describe('calculateFigElement', () => {
    test.each([
        ['(', 0.1],
        ['-o', 0.5],
        ['-2o', 2.4],
        ['42/', 4.8],
        ['.-/', 0.7],
        ['.1', 0.8],
        ['.--<', 2.6],
        ['2--o', 6.3],
    ])('should calculate "%s" and return %f', (symbol, expected) => {
        expect(calculateFigElement(symbol)).toBe(expected);
    });
});
