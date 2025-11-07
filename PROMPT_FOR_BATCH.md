# Creating a Batch Script

## Prerequisites

Before creating a new script, ensure the following dependencies are available:

1. **Detect the package manager** in use:

   - Check for `yarn.lock` → use `yarn`
   - Check for `package-lock.json` → use `npm`
   - Check for `pnpm-lock.yaml` → use `pnpm`
   - Check for `bun.lockb` → use `bun`

2. **Check package.json** for these dependencies:

   - `zx` - Tool for writing better scripts
   - `ora` - Terminal spinner
   - `boxen` - Create boxes in terminal
   - `tsx` - TypeScript execution

3. **Install missing dependencies** if needed:

   ```bash
   # Using yarn
   yarn add zx ora boxen
   yarn add -D tsx typescript

   # Using npm
   npm install zx ora boxen
   npm install -D tsx typescript

   # Using pnpm
   pnpm add zx ora boxen
   pnpm add -D tsx typescript

   # Using bun
   bun add zx ora boxen
   bun add -D tsx typescript
   ```

## Creating a New Script

### 1. File Location

Create your script at: `scripts/<script-name>.tsx`

Example: `scripts/process-data.tsx`

### 2. Basic Template

```tsx
#!/usr/bin/env node
import "zx/globals";
import boxen from "boxen";
import ora from "ora";

// Display a message in a box
const message = boxen("Script starting...", {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
});

console.log(message);

// Show spinner while processing
const spinner = ora("Processing...").start();

// Do some work
await new Promise((resolve) => setTimeout(resolve, 2000));

spinner.succeed("Complete!");

console.log("\nDone!");
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

### Boxen - Display Messages in Boxes

```tsx
import boxen from "boxen";

// Simple box
const box = boxen("Hello!");
console.log(box);

// Styled box
const styledBox = boxen("Important message", {
  padding: 1,
  margin: 1,
  borderStyle: "round", // single, double, round, bold, etc.
  borderColor: "green", // green, red, blue, yellow, etc.
  backgroundColor: "#555555",
  textAlignment: "center",
});
console.log(styledBox);

// Box with title
const titleBox = boxen("Content here", {
  title: "Title",
  titleAlignment: "center",
  padding: 1,
});
console.log(titleBox);
```

### Ora - Loading Spinners

```tsx
import ora from "ora";

// Basic spinner
const spinner = ora("Loading...").start();
await someAsyncWork();
spinner.succeed("Success!");

// Spinner with different states
const spinner2 = ora("Processing...").start();
try {
  await riskyOperation();
  spinner2.succeed("Completed!");
} catch (error) {
  spinner2.fail("Failed!");
}

// Spinner with warnings
spinner2.warn("Warning message");
spinner2.info("Info message");

// Change spinner text
const spinner3 = ora("Step 1").start();
await step1();
spinner3.text = "Step 2";
await step2();
spinner3.succeed("All steps complete!");

// Custom spinner
const spinner4 = ora({
  text: "Custom spinner",
  spinner: "dots",
  color: "yellow",
}).start();
```

### zx - Shell Commands

```tsx
import "zx/globals";

// Run shell commands with $
const output = await $`ls -la`;
console.log(output.stdout);

// Handle errors
try {
  await $`exit 1`;
} catch (error) {
  console.error("Command failed");
}

// Pipe commands
await $`cat file.txt | grep pattern`;

// Use template literals with variables
const dir = "src";
await $`ls ${dir}`;

// Quiet mode (suppress output)
const result = await $`echo secret`.quiet();

// Get output as string
const files = (await $`ls`.quiet()).stdout.trim().split("\n");

// Conditional execution
if (await $`command -v git`.exitCode === 0) {
  console.log("Git is installed");
}
```

### Combining Tools

```tsx
#!/usr/bin/env node
import "zx/globals";
import boxen from "boxen";
import ora from "ora";

// Show title
console.log(
  boxen("Deployment Script", {
    padding: 1,
    borderStyle: "double",
    borderColor: "blue",
  })
);

// Step 1: Build
const buildSpinner = ora("Building project...").start();
await $`npm run build`.quiet();
buildSpinner.succeed("Build complete!");

// Step 2: Test
const testSpinner = ora("Running tests...").start();
try {
  await $`npm test`.quiet();
  testSpinner.succeed("Tests passed!");
} catch {
  testSpinner.fail("Tests failed!");
  process.exit(1);
}

// Step 3: Deploy
const deploySpinner = ora("Deploying...").start();
await new Promise((resolve) => setTimeout(resolve, 2000));
deploySpinner.succeed("Deployed!");

// Summary
console.log(
  boxen("Deployment successful!", {
    padding: 1,
    borderColor: "green",
    borderStyle: "round",
  })
);
```
