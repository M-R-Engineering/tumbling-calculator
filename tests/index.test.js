import { calculateFigElement } from '../src/index.js';

describe('calculateFigElement', () => {
    test('should calculate basic element "("', () => {
        expect(calculateFigElement('(')).toBe(0.1);
    });

    test('should calculate "-o"', () => {
        expect(calculateFigElement('-o')).toBe(0.5);
    });

    test('should calculate "-2o"', () => {
        expect(calculateFigElement('-2o')).toBe(2.4);
    });

    test('should calculate "42/"', () => {
        expect(calculateFigElement('42/')).toBe(4.8);
    });

    test('should calculate ".-/"', () => {
        expect(calculateFigElement('.-/')).toBe(0.7);
    });

    test('should calculate ".1"', () => {
        expect(calculateFigElement('.1')).toBe(0.8);
    });

    test('should calculate ".--<"', () => {
        expect(calculateFigElement('.--<')).toBe(2.6);
    });

    test('should calculate "2--o"', () => {
        expect(calculateFigElement('2--o')).toBe(6.3);
    });
});
