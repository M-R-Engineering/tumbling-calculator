import { calculateFigElement } from './calculateFigElement.js';
import {Routine} from "./models.js";

/**
 * Calculates the total FIG points of a tumbling routine
 * @param routine {string}
 * @returns {number}
 */
export function calculateRoutine(routine) {
    const routineElt = Routine.fromString(routine);
    return routineElt.getTotalPoints();
}

// ============================================================================
// Exports
// ============================================================================

export { Element } from './models.js';

export default {
    calculateFigElement,
    calculateRoutine,
};
