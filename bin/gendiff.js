#!/usr/bin/env node
import { Command } from 'commander';
import genTree from '../src/genTree.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => console.log(
    genTree(filepath1, filepath2, options.format),
  ))
  .parse();
