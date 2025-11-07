#!/usr/bin/env node
import "zx/globals";
import boxen from "boxen";
import ora from "ora";

// Display greeting in a box
const greeting = boxen("Hello! Welcome to the batch script demo.", {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
});

console.log(greeting);

// Show spinner for 10 seconds
const spinner = ora("Processing...").start();

await new Promise((resolve) => setTimeout(resolve, 10000));

spinner.succeed("Complete!");

console.log("\nGoodbye!");
