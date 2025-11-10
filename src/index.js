import { BASICS_ELEMENTS } from './models.js';

/**
 * Calculates the FIG points of a tumbling element
 * @param {string} symbol - Symbol representing the element
 * @returns {number} FIG points of the element
 */
export function calculateFigElement(symbol) {
    // Check if it's a basic element
    for (let element of BASICS_ELEMENTS) {
        if (element.is(symbol)) {
            return element.fig;
        }
    }

    // Calculate points for a complex element
    const nbRotations = countRotations(symbol);
    const nbDemiVrille = countNbDemiVrille(symbol);

    let totalPoints = 0;
    totalPoints += calculateRotationPoints(nbRotations);
    totalPoints += calculateFrontBonus(symbol, nbRotations);
    totalPoints += calculateVrillePoints(nbDemiVrille, nbRotations);
    totalPoints += calculatePositionBonus(symbol, nbRotations);

    // console.log(`${symbol} have ${nbRotations} rotations and ${nbDemiVrille} demi vrille for a total of ${roundToOneDecimal(totalPoints * nbRotations)} points`);
    // console.log(`\t -> ${calculateRotationPoints(nbRotations)} rotation points`);
    // console.log(`\t -> ${calculateFrontBonus(symbol, nbRotations)} front bonus`);
    // console.log(`\t -> ${calculateVrillePoints(nbDemiVrille, nbRotations)} vrille points`);
    // console.log(`\t -> ${calculatePositionBonus(symbol, nbRotations)} position bonus`);

    return roundToOneDecimal(totalPoints * nbRotations);
}

export function calculateRoutine(routine) {
    let totalPoints = 0;
    const routineArray = routine.split(' ');
    for (let element of routineArray) {
        totalPoints += calculateFigElement(element);
    }
    return roundToOneDecimal(totalPoints);
}

// ============================================================================
// Utility functions
// ============================================================================

/**
 * Checks if the element is a front salto
 * @param {string} symbol - Symbol of the element
 * @returns {boolean} True if the element is front-facing
 */
function isFront(symbol) {
    return symbol.startsWith('.');
}

/**
 * Checks if a character is a digit (twist)
 * @param {string} char - Character to check
 * @returns {boolean} True if it's a digit
 */
function isVrille(char) {
    const num = parseInt(char, 10);
    return !isNaN(num) && num >= 0 && num <= 9;
}

/**
 * Rounds a number to 1 decimal place to avoid floating-point precision issues
 * @param {number} num - The number to round
 * @returns {number} The number rounded to 1 decimal place
 */
function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
}

// ============================================================================
// Counting functions
// ============================================================================

/**
 * Counts the number of rotations in a symbol
 * @param {string} symbol - Symbol of the element
 * @returns {number} Number of rotations
 */
function countRotations(symbol) {
    let cleanSymbol = symbol
        .replace('.', '')  // Remove front indicator
        .replace(/[o<\/]/g, '');  // Remove position indicators

    return cleanSymbol.length;
}

/**
 * Counts the number of half-twists in a symbol
 * @param {string} symbol - Symbol of the element
 * @returns {number} Number of half-twists
 */
function countNbDemiVrille(symbol) {
    let count = 0;
    let cleanSymbol = symbol
        .replace('.', '')  // Remove front indicator
        .replace(/[o<\/]/g, '');  // Remove position indicators

    for (let char of cleanSymbol) {
        if (isVrille(char)) {
            count += parseInt(char, 10);
        }
    }

    return count;
}

// ============================================================================
// Points calculation functions
// ============================================================================

/**
 * Calculates basic rotation points
 * @param {number} nbRotations - Number of rotations
 * @returns {number} Rotation points
 */
function calculateRotationPoints(nbRotations) {
    return roundToOneDecimal(nbRotations * 0.5);
}

/**
 * Calculates the bonus for a front-facing element
 * @param {string} symbol - Symbol of the element
 * @param {number} nbRotations - Number of rotations
 * @returns {number} Bonus points for front-facing element
 */
function calculateFrontBonus(symbol, nbRotations) {
    if (!isFront(symbol)) {
        return 0;
    }
    return roundToOneDecimal(0.1 * nbRotations);
}

/**
 * Calculates twist points according to the number of rotations
 * @param {number} nbDemiVrille - Number of half-twists
 * @param {number} nbRotations - Number of rotations
 * @returns {number} Twist points
 */
function calculateVrillePoints(nbDemiVrille, nbRotations) {
    let points = 0.0;

    if (nbRotations === 1) {
        for (let index = 1; index <= nbDemiVrille; index++) {
            if (index <= 4) {
                points += 0.2;
            } else if (index > 4 && index <= 6) {
                points += 0.3;
            } else {
                points += 0.4;
            }
        }
    } else if (nbRotations === 2) {
        for (let index = 1; index <= nbDemiVrille; index++) {
            if (index <= 2) {
                points += 0.1;
            } else if (index > 2 && index <= 4) {
                points += 0.2;
            } else if (index > 4 && index <= 6) {
                points += 0.3;
            } else {
                points += 0.4;
            }
        }
    } else if (nbRotations === 3) {
        for (let index = 1; index <= nbDemiVrille; index++) {
            if (index <= 2) {
                points += 0.3;
            } else {
                points += 0.4;
            }
        }
    }

    return roundToOneDecimal(points);
}

/**
 * Calculates position bonus according to the last character
 * @param {string} symbol - Symbol of the element
 * @param {number} nbRotations - Number of rotations
 * @returns {number} Position bonus points
 */
function calculatePositionBonus(symbol, nbRotations) {
    const lastChar = symbol.charAt(symbol.length - 1);
    let bonus = 0;

    if (lastChar === '<') {
        if (nbRotations === 1 || nbRotations === 2) {
            bonus = 0.1;
        } else if (nbRotations === 3) {
            bonus = 0.2;
        } else if (nbRotations > 3) {
            bonus = 0.3;
        }
    } else if (lastChar === '/') {
        if (nbRotations === 1) {
            bonus = 0.1;
        } else if (nbRotations === 2) {
            bonus = 0.2;
        } else if (nbRotations === 3) {
            bonus = 0.3;
        }
    }

    return bonus;
}

// ============================================================================
// Exports
// ============================================================================

export { Element } from './models.js';

export default {
    calculateFigElement,
    calculateRoutine,
};
