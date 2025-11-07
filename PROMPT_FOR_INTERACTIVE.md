# Creating an Interactive Script

## Prerequisites

Before creating a new script, ensure the following dependencies are available:

1. **Detect the package manager** in use:

   - Check for `yarn.lock` → use `yarn`
   - Check for `package-lock.json` → use `npm`
   - Check for `pnpm-lock.yaml` → use `pnpm`
   - Check for `bun.lockb` → use `bun`

2. **Check package.json** for these dependencies:

   - `ink` - React for CLI apps
   - `react` - UI library
   - `tsx` - TypeScript execution
   - `@types/ink` - Type definitions
   - `@types/react` - Type definitions

3. **Install missing dependencies** if needed:

   ```bash
   # Using yarn
   yarn add ink react
   yarn add -D tsx @types/ink @types/react typescript

   # Using npm
   npm install ink react
   npm install -D tsx @types/ink @types/react typescript

   # Using pnpm
   pnpm add ink react
   pnpm add -D tsx @types/ink @types/react typescript

   # Using bun
   bun add ink react
   bun add -D tsx @types/ink @types/react typescript
   ```

## Creating a New Script

### 1. File Location

Create your script at: `scripts/<script-name>.tsx`

Example: `scripts/hello-world.tsx`

### 2. Basic Template

```tsx
import React, { useState } from "react";
import { render, Box, Text, useInput } from "ink";

const App: React.FC = () => {
  const [state, setState] = useState("");

  useInput((input, key) => {
    if (key.return) {
      // Handle Enter key
      return;
    }

    if (key.escape) {
      // Handle Escape key
      setState("");
      return;
    }

    if (key.backspace || key.delete) {
      setState((prev) => prev.slice(0, -1));
    } else if (input && !key.ctrl && !key.meta) {
      setState((prev) => prev + input);
    }
  });

  return (
    <Box flexDirection="column">
      <Text>Your interactive UI here</Text>
      <Text>{state}</Text>
    </Box>
  );
};

render(<App />);
```

### 3. Add Script Entry

Add an entry to `package.json` scripts section:

```json
"scripts": {
  "script-name": "tsx scripts/<script-name>.tsx"
}
```

### 4. Run Your Script

Use the detected package manager:

```bash
# Using yarn
yarn script-name

# Using npm
npm run script-name

# Using pnpm
pnpm script-name

# Using bun
bun run script-name
```

## Common Patterns

### Static Message Lists

For rendering lists that grow over time without re-rendering previous items:

```tsx
import { Static } from "ink";

interface Message {
  id: string;
  content: string;
}

// In your component:
<Static items={messages}>
  {(msg: Message) => (
    <Box key={msg.id}>
      <Text>{msg.content}</Text>
    </Box>
  )}
</Static>;
```

### Input Handling

```tsx
useInput((input, key) => {
  if (key.return) {
    // Submit action
  }
  if (key.escape) {
    // Clear/cancel action
  }
  if (key.backspace || key.delete) {
    // Remove last character
  }
  if (input && !key.ctrl && !key.meta) {
    // Append character to input
  }
});
```

### Layout Components

```tsx
// Vertical stack
<Box flexDirection="column">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Box>

// Horizontal row
<Box flexDirection="row">
  <Text>Left</Text>
  <Text>Right</Text>
</Box>

// With borders
<Box borderStyle="round" borderColor="green" paddingX={1}>
  <Text>Content</Text>
</Box>
```
