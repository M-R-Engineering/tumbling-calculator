class Element {
    constructor(symbol, fig, ffgym) {
        this.symbol = symbol;
        this.fig = fig;
        this.ffgym = ffgym;
    }
    is(symbol){
        return this.symbol === symbol;
    }
}
const basicElements = [
    new Element('!', 0, 0),
    new Element('X', 0.1, 0.0),
    new Element('(', 0.1, 0.1),
    new Element('f', 0.1, 0.1),
    new Element('S', 0.1, 0.1),
    new Element('^', 0.2, 0.4)
];

export function calculateFigElement(symbol) {
    for (let element of basicElements) {
        if (element.is(symbol)) {
            return element.fig;
        }
    }
    let totalPoints = 0;
    let isFrontElement = isFront(symbol);
    let nbRotations = countRotations(symbol);
    let nbDemiVrille = countNbDemiVrille(symbol);


    if (isFrontElement) {
        totalPoints += .1;
    }
    totalPoints += (nbRotations * 0.5 ) * nbRotations;
    totalPoints += calculateVrillePoints(nbDemiVrille, nbRotations);
    for (let char of symbol) {

        if (char === '>') {
            if(nbRotations === 1 || nbRotations === 2){
                totalPoints += 0.1;
            } else if (nbRotations === 3){
                totalPoints += 0.2;
            } else if (nbRotations > 3){
                totalPoints += 0.3;
            }
        }
        if (char === "/") {
            if(nbRotations === 1){
                totalPoints += 0.1;
            } else if (nbRotations === 2){
                totalPoints += 0.2;
            } else if (nbRotations === 3){
                totalPoints += 0.3;
            }
        }
    }
    console.log(symbol + " total points before: " + totalPoints);
    totalPoints = totalPoints * nbRotations;
    console.log(symbol + " total points after multiplication: " + totalPoints);
    return totalPoints;
}

function isFront(symbol) {
    return symbol.startsWith('.');
}
function isVrille(char) {
    // Vérifie si le caractère est un chiffre de 1 à 4
    return ['1', '2', '3', '4'].includes(char);
}
function countRotations(symbol) {
    symbol = symbol.replace('.', ''); // Remove front indicator for rotation count
    symbol = symbol.replace('o', '').replace('<','').replace('/',''); // Remove position indicator for rotation count
    return symbol.length;
}
function countNbDemiVrille(symbol) {
    let count = 0;
    symbol = symbol.replace('.', ''); // Remove front indicator for rotation count
    symbol = symbol.replace('o', '').replace('<','').replace('/',''); // Remove position indicator for rotation count
    for (let char of symbol) {
        if(isVrille(char)) {
            count += parseInt(char);
        }
    }
    return count;
}
function calculateVrillePoints(nbDemiVrille, nbRotations) {
    let points = 0;
    if(nbRotations === 1) {
        for(let index = 1; index <= nbDemiVrille; index++) {
            if(index <= 4) {
                points += 0.2;
            } else if (index <= 6) {
                points += 0.3;
            } else {
                points += 0.4;
            }
        }
    } else if (nbRotations === 2) {
        for(let index = 1; index <= nbDemiVrille; index++) {
            if(index <= 2) {
                points += 0.1;
            } else if (index <= 4) {
                points += 0.2;
            } else if (index <= 6) {
                points += 0.3;
            } else {
                points += 0.4;
            }
        }
    } else if (nbRotations === 3) {
        for(let index = 1; index <= nbDemiVrille; index++) {
            if(index <= 2) {
                points += 0.3;
            } else {
                points += 0.4;
            }
        }
    }
    return points;
}

// Export default pour faciliter l'importation
export default {
    Element,
    calculateFigElement,
};
