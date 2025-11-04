# Tumbling Calculator

Une librairie JavaScript pour calculer les points FIG (Fédération Internationale de Gymnastique) des éléments de tumbling.

## ⚠️ Licence - Usage Non-Commercial Uniquement

Cette librairie est distribuée sous licence **CC-BY-NC-4.0** (Creative Commons Attribution-NonCommercial 4.0 International).

**Vous POUVEZ :**
- ✅ Utiliser cette librairie pour des projets personnels
- ✅ Utiliser cette librairie pour l'éducation
- ✅ Modifier et adapter le code
- ✅ Partager la librairie

**Vous NE POUVEZ PAS :**
- ❌ Utiliser cette librairie dans des projets commerciaux
- ❌ Vendre des produits ou services utilisant cette librairie
- ❌ Utiliser cette librairie dans un contexte générant des revenus

**Pour un usage commercial**, veuillez contacter l'auteur pour obtenir une licence appropriée.

## Installation

```bash
npm install tumbling-calculator
```

## Usage

### ES6 Modules

```javascript
import { calculateFigElement, testCalculateFigElement } from 'tumbling-calculator';

// Calculer les points FIG d'un élément
const points = calculateFigElement('-o');
console.log(points); // 0.5

// Exemples d'éléments
calculateFigElement('(');      // 0.1
calculateFigElement('-2o');    // 2.4
calculateFigElement('42/');    // 4.8
calculateFigElement('.-/');    // 0.7
calculateFigElement('.1');     // 0.8
calculateFigElement('.--<');   // 2.3
calculateFigElement('2--o');   // 6.3
```

### CommonJS

```javascript
const { calculateFigElement, testCalculateFigElement } = require('tumbling-calculator');

const points = calculateFigElement('-o');
console.log(points); // 0.5
```

## API

### `calculateFigElement(symbol)`

Calcule les points FIG d'un élément de tumbling en fonction de son symbole.

- `symbol` (string): Symbole représentant l'élément de tumbling
  - `.` : indique un élément en avant
  - `-` : rotation
  - `o`, `<`, `/` : indicateurs de position
  - `1`, `2`, `3`, `4` : demi-vrilles
  - `>` : modificateur de position
- Retourne : (number) Points FIG de l'élément

**Éléments de base reconnus :**
- `!` : 0 points
- `X` : 0.1 points (FIG)
- `(`, `f`, `S` : 0.1 points
- `^` : 0.2 points (FIG)

## Exemples

```javascript
import { calculateFigElement } from 'tumbling-calculator';

// Salto arrière groupé
console.log(calculateFigElement('('));  // 0.1

// Salto arrière avec position
console.log(calculateFigElement('-o'));  // 0.5

// Double salto avec vrille
console.log(calculateFigElement('-2o'));  // 2.4

// Quadruple avec vrille et position
console.log(calculateFigElement('42/'));  // 4.8

// Salto avant
console.log(calculateFigElement('.-/'));  // 0.7
```

## Développement

```bash
# Installer les dépendances
npm install

# Construire la librairie
npm run build

# Exécuter les tests
npm test
```

## Licence

ISC
