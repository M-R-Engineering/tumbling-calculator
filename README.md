# Tumbling Calculator

A JavaScript library for calculating FIG (Fédération Internationale de Gymnastique) points for tumbling elements.

## ⚠️ License - Non-Commercial Use Only

This library is distributed under the **CC-BY-NC-4.0** (Creative Commons Attribution-NonCommercial 4.0 International) license.

**You CAN:**
- ✅ Use this library for personal projects
- ✅ Use this library for education
- ✅ Modify and adapt the code
- ✅ Share the library

**You CANNOT:**
- ❌ Use this library in commercial projects
- ❌ Sell products or services using this library
- ❌ Use this library in any revenue-generating context

**For commercial use**, please contact the author to obtain an appropriate license.

## Installation

```bash
npm install tumbling-calculator
```

## Usage

### ES6 Modules

```javascript
import { calculateFigElement } from 'tumbling-calculator';

// Calculate FIG points for an element
const points = calculateFigElement('-o');
console.log(points); // 0.5

// More examples
calculateFigElement('(');      // 0.1 - Round-off
calculateFigElement('-o');     // 0.5 - Back salto
calculateFigElement('-2o');    // 2.4 - Back in Full out
calculateFigElement('42/');    // 4.8 - Double full in full out straight
calculateFigElement('.-/');    // 0.7 - Front straight salto
calculateFigElement('.1');     // 0.8 - Barani
calculateFigElement('.--<');   // 2.3 - Double front pike
calculateFigElement('2--o');   // 6.3 - full in back back
```

### CommonJS

```javascript
const { calculateFigElement } = require('tumbling-calculator');

const points = calculateFigElement('-o');
console.log(points); // 0.5
```

## Symbol Notation

The library uses a symbolic notation to represent tumbling elements:

### Basic Symbols

- `.` - Front-facing element indicator (placed at the beginning)
- `-` - Rotation (each `-` represents one rotation)
- `0-9` - Half-twists (numbers indicate the number of half-twists)
- `o` - Position indicator (tuck)
- `<` - Position indicator (pike)
- `/` - Position indicator (straight)

### Basic Elements

The following basic elements are recognized with fixed values:

- `!` - 0.0 points
- `X` - 0.1 points
- `(` - 0.1 points
- `f` - 0.1 points
- `S` - 0.1 points
- `^` - 0.2 points

### Complex Elements

For complex elements, the library calculates points based on:

1. **Rotation points**: 0.5 points per rotation
2. **Front bonus**: 0.1 points per rotation for front-facing elements (starting with `.`)
3. **Twist points**: Progressive scoring based on number of rotations and half-twists
4. **Position bonus**: Additional points based on the final position indicator (`<` or `/`)

All calculated points are multiplied by the number of rotations to get the final score.

## API

### `calculateFigElement(symbol)`

Calculates the FIG points of a tumbling element based on its symbol.

**Parameters:**
- `symbol` (string): Symbol representing the tumbling element

**Returns:**
- (number): FIG points of the element, rounded to 1 decimal place

**Examples:**

```javascript
// Basic elements
calculateFigElement('(');   // 0.1

// Back salto with position
calculateFigElement('-o');  // 0.5

// Double back with twist
calculateFigElement('-2o'); // 2.4

// Quad with complex twist
calculateFigElement('42/'); // 4.8

// Front salto
calculateFigElement('.-/'); // 0.7

// Front with twist
calculateFigElement('.1');  // 0.8

// Double front with position
calculateFigElement('.--<'); // 2.3

// Triple with twist
calculateFigElement('2--o'); // 6.3
```

## Development

### Install Dependencies

```bash
npm install
```

### Build the Library

```bash
npm run build
```

The build process uses Rollup to generate:
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Module format

### Run Tests

```bash
npm test
```

Tests are written with Jest and located in the `tests/` directory.

## Project Structure

```
tumbling-calculator/
├── src/
│   └── index.js          # Main source file
├── tests/
│   └── index.test.js     # Test suite
├── dist/                 # Built files (generated)
├── package.json
├── rollup.config.js      # Build configuration
├── jest.config.js        # Test configuration
├── LICENSE               # CC-BY-NC-4.0 license
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

When contributing, please:
1. Write tests for new features
2. Ensure all tests pass (`npm test`)
3. Follow the existing code style
4. Update documentation as needed

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC-BY-NC-4.0).

See the [LICENSE](LICENSE) file for details.

For commercial licensing inquiries, please contact the author.

## Author

@maaxow - M-R-Engineering

## Links

- [Repository](https://github.com/M-R-Engineering/tumbling-calculator)
- [Issues](https://github.com/M-R-Engineering/tumbling-calculator/issues)
- [NPM Package](https://www.npmjs.com/package/tumbling-calculator)

## Acknowledgments

This library implements FIG (Fédération Internationale de Gymnastique) scoring rules for tumbling elements.
