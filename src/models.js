import { calculateFigElement } from "./index.js";

/**
 * Represents a basic tumbling element
 */
export class Element {
    /**
     * @param {string} symbol - Symbol representing the element
     * @param {number} fig - FIG points value
     */
    constructor(symbol, fig) {
        /** @type {string} */
        this.symbol = symbol;
        /** @type {number} */
        this.fig = fig;
    }

    /**
     * @param {string} symbol - Symbol to compare
     * @returns {boolean} True if symbols match
     */
    is(symbol) {
        return this.symbol === symbol;
    }
}

export const BASICS_ELEMENTS = [
    new Element('!', 0),
    new Element('X', 0.1),
    new Element('(', 0.1),
    new Element('f', 0.1),
    new Element('S', 0.1),
    new Element('^', 0.2)
];

/**
 * Represents a tumbling routine (sequence of elements)
 */
export class Routine {
    /**
     * @param {Element[]} elements - Array of element symbols
     */
    constructor(elements = []) {
        /** @type {Element[]} */
        this.elements = elements;
    }

    /**
     * Adds an element to the routine
     * @param {Element} element - Symbol of the element to add
     * @returns {void}
     */
    addElement(element) {
        this.elements.push(element);
    }

    /**
     * Gets all elements in the routine
     * @returns {Element[]} Array of element symbols
     */
    getElements() {
        return this.elements;
    }

    getTotalPoints() {
        return this.elements.reduce((acc, elt) => acc + elt.fig, 0);
    }

    /**
     * Returns the routine as a string
     * @returns {string} Space-separated elements
     */
    toString() {
        return this.elements.map(elt => elt.symbol).join(' ');
    }

    /**
     * Parses a routine string into a Routine object
     * @param {string} routineString - Space-separated element symbols
     * @returns {Routine} Routine object
     */
    static fromString(routineString) {
        const routine = new Routine();
        const symbolList = routineString.split(' ').filter(e => e.trim() !== '');
        symbolList.forEach(symbol => {
            routine.addElement(new Element(symbol, calculateFigElement(symbol)));
        });
        return routine;
    }
}
