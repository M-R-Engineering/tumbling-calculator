import { calculateRoutine } from '../src/index.js';

describe('calculateRoutine', () => {
    test.each([
        ['( ^ ^ f -/', 1.2],
        ['( ^ ^ ^ ^ ^ f 2-/', 4.0],
        ['( ^ f ^ f ^ f 3', 2.1],
        ['( 22/ ^ f 2-/ ^ f 42/', 11.9],
    ])('should calculate "%s" and return %s', (routine, expected) => {
        expect(calculateRoutine(routine)).toBe(expected);
    });
});
