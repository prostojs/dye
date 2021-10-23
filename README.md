<p align="center">
<img src="./docs/logo.svg" width="100%" style="max-width: 900px" />
<a  href="https://github.com/prostojs/prosto-router/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</a>
    <img src="https://img.shields.io/badge/Dependencies-0-green?style=for-the-badge" />
</p>

Easy and light console styling tool.

Supports plain colors, modifiers, 256 color mode and true color mode (16m colors)

## Install

`npm install @prostojs/dye`

## Usage

```js
import { dye } from '@prostojs/dye'

const bold = dye('BOLD')
console.log(bold('Text In Bold'))
// Text in Bold
```

<img src="./docs/colors.png" />

### dye (coloring)
Returns a `style` function based on input arguments.

Supports plain colors: `BLACK`, `RED`, `GREEN`, `YELLOW`, `BLUE`, `MAGENTA`, `CYAN`, `WHITE`.

Prefix `BG_` turns color to background color.

Suffix `_BRIGHT` makes color brighter.

Grayscale colors: `GRAY<01..22>` (`GRAY01`, `GRAY02`, ..., `GRAY22`)

Supports modifiers: `BOLD`, `DIM`, `ITALIC`, `UNDERSCORE`, `INVERSE`, `HIDDEN`, `CROSSED`.

Supports True Color rgb:
```js
dye('255,0,0') // red True Color
dye('BG255,0,0') // red True Color background
```

Supports 256 rgb version:
```js
dye('_5,0,0') // red 256
dye('BG_5,0,0') // red 256 background
```

Simple example
```js
const bold = dye('BOLD')
console.log(bold('Text In Bold'))
```

Advanced example
```js
const myStyle = dye('ITALIC', 'BG_RED', '0,0,255')
console.log(myStyle('Styled italic blue text with red BG'))
```

