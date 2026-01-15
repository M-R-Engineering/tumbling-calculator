import {Routine} from "../src/models.js";

describe('Routine Class getTotalPoints()', () => {
    test.each([
        ['( ^ ^ f -/', 1.2],
        ['( ^ ^ ^ ^ ^ f 2-/', 4.0],
        ['( ^ f ^ f ^ f 3', 2.1],
        ['( 22/ ^ f 2-/ ^ f 42/', 11.9],
    ])('should calculate "%s" and return %s', (routineStr, expected) => {
        const routine = Routine.fromString(routineStr);
        expect(routine.getTotalPoints()).toBeCloseTo(expected, 1);
    });
});
