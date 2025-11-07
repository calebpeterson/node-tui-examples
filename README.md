# Node TUI Sandbox

A sandbox project for experimenting with interactive and batch terminal scripts using modern Node.js tools.

## Getting Started

Install dependencies:

```bash
yarn install
```

## Examples

Run any example using yarn:

### Counter

```bash
yarn counter
```

A simple counter that increments on each render.

### Input

```bash
yarn input
```

Basic text input example with live display.

### Interactive

```bash
yarn interactive
```

Echo chamber that displays user input when Enter is pressed.

### Chat

```bash
yarn chat
```

Multi-component chat interface with message list and input handling.

### Batch

```bash
yarn batch
```

Non-interactive script with boxed greeting, spinner, and automatic exit.

## Creating Your Own Scripts

See the prompt guides for creating new scripts:

- **[PROMPT_FOR_INTERACTIVE.md](PROMPT_FOR_INTERACTIVE.md)** - Guide for creating interactive scripts using Ink
- **[PROMPT_FOR_BATCH.md](PROMPT_FOR_BATCH.md)** - Guide for creating batch scripts using zx, ora, and boxen

## Tech Stack

### Interactive

- **React** - UI library
- **Ink** - React for CLI apps

### Batch

- **zx** - Shell scripting
- **ora** - Terminal spinner
- **boxen** - Terminal boxes

### Common

- **TypeScript** - Type safety
- **tsx** - TypeScript execution
