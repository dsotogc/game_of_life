# Game of Life - Conway's Cellular Automaton

A web-based implementation of John Conway's Game of Life, featuring an interactive canvas, configurable settings, and predefined patterns.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Usage](#usage)
- [Rules](#rules)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [License](#license)
- [Author](#author)

## About

The Game of Life is a cellular automaton devised by mathematician John Horton Conway in 1970. It is a zero-player game, meaning its evolution is determined by its initial state, requiring no further input. This implementation provides an interactive way to explore the fascinating patterns and behaviors that emerge from simple rules.

## Features

- **Interactive Canvas**: Click to toggle cells on/off and create custom patterns
- **Pattern Library**: Quick access to classic patterns like Glider, Blinker, Toad, Beacon, and Pulsar
- **Configurable Settings**:
  - Adjustable FPS (1-60 frames per second)
  - Multiple canvas sizes (800x600, 900x700, 1000x800)
- **Playback Controls**: Start, stop, and clear the simulation
- **Real-time Statistics**: Track generation count and elapsed time
- **Responsive Design**: Elegant, monochromatic brown-beige theme

## Demo

The application is deployed and available at:

**[https://dsoto-game-of-life.pages.dev/](https://dsoto-game-of-life.pages.dev/)**

Visit the live demo to explore Conway's Game of Life directly in your browser. No installation required.

## Usage

### Basic Operations

1. **Creating Patterns**:
   - Left-click on cells to toggle them between alive and dead states
   - Draw custom patterns before starting the simulation

2. **Using Predefined Patterns**:
   - Select a pattern from the dropdown menu
   - Right-click on the canvas to place the pattern at the cursor position
   - The pattern will be centered at the click location

3. **Running the Simulation**:
   - Click "COMENZAR" (Start) to begin the simulation
   - Click "PARAR" (Stop) to pause
   - Click "LIMPIAR" (Clear) to reset the grid

4. **Adjusting Settings**:
   - Modify FPS to control simulation speed
   - Change canvas size for larger or smaller grids
   - Click "APLICAR" (Apply) to apply changes

## Rules

Conway's Game of Life follows four simple rules:

1. **Underpopulation**: Any live cell with fewer than 2 live neighbors dies
2. **Survival**: Any live cell with 2 or 3 live neighbors survives
3. **Overpopulation**: Any live cell with more than 3 live neighbors dies
4. **Reproduction**: Any dead cell with exactly 3 live neighbors becomes alive

These rules are applied simultaneously to all cells in each generation, creating complex emergent behaviors from simple initial conditions.

## Technologies

This project is built using vanilla web technologies:

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with custom properties and flexbox layout
- **JavaScript (ES6+)**: Game logic and DOM manipulation
- **Canvas API**: Grid rendering and visualization

No frameworks or libraries are required, making this a lightweight and dependency-free implementation.

## Project Structure

```
game-of-life/
│
├── index.html
├── README.md
│
├── src/
│   ├── main.js
│   ├── style.css
│   ├── about.html
│   └── aboutstyle.css
│
└── img/
    └── healthy-life.png
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**David Soto García**

- GitHub: [@dsotogc](https://github.com/dsotogc)
- Project Link: [https://github.com/dsotogc/game-of-life](https://github.com/dsotogc/game-of-life)
