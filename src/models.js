import { calculateFigElement } from "./calculateFigElement.js";

/**
 * Represents a basic tumbling element
 */
export class Element {
    /**
     * @param {string} symbol - Symbol representing the element
     * @param {number} points - FIG points value
     */
    constructor(symbol, points) {
        /** @type {string} */
        this.symbol = symbol;
        /** @type {number} */
        this.points = points;
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
     * @param {string} name - Name of the routine
     * @param {Element[]} elements - Elements
     */
    constructor(name, elements) {
        /** @type {string} */
        this.name = name || 'Unnamed Routine';
        /** @type {Element[]} */
        this.elements = elements;
        /** @type {number} */
        this.totalPoint = elements ? elements.reduce((acc, elt) => acc + elt.points, 0) : 0;
    }

    /**
     * Adds an element to the routine
     * @param {Element} element - Symbol of the element to add
     * @returns {void}
     */
    addElement(element) {
        if(!this.elements) {
            this.elements = [];
        }
        this.elements.push(element);
    }

    /**
     * Gets all elements in the routine
     * @returns {Element[]} Array of element symbols
     */
    getElements() {
        return this.elements;
    }

    /**
     * Calculates total points of the routine
     * @returns {number}
     */
    getTotalPoints() {
        return this.elements.reduce((acc, elt) => acc + elt.points, 0);
    }

    /**
     * Returns the routine as a string
     * @returns {string} Space-separated elements
     */
    toString() {
        return this.elements.map(elt => elt.symbol).join(' ');
    }

    /**
     * Converts to JSON object (matching routine-sample.json structure)
     * @returns {Object} JSON object compatible with routine-sample.json
     */
    toJSON() {
        return {
            name: this.name,
            totalPoint: this.totalPoint,
            routine: {
                elements: this.elements.map(el => ({
                    symbol: el.symbol,
                    points: el.points
                }))
            }
        };
    }

    /**
     * Parses a routine string into a Routine object
     * @param {string} routineString - Space-separated element symbols
     * @returns {Routine} Routine object
     */
    static fromString(routineString) {
        const symbolList = routineString.split(' ').filter(e => e.trim() !== '');
        const elements = symbolList.map(s => {
            // Vérifie d'abord si c'est un élément basique (évite la dépendance circulaire)
            const basic = BASICS_ELEMENTS.find(b => b.is(s));
            if (basic) return basic;
            // Sinon calcule les points via la fonction utilitaire
            return new Element(s, calculateFigElement(s));
        });
        return new Routine(undefined, elements);
    }
}

