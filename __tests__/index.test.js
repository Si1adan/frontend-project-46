import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genTree from '../src/genTree.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genTree js case', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = readFile('expected_file_stylish.yml');

  expect(genTree(path1, path2)).toBe(expected);
});
test('genTree yml case', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const expected = readFile('expected_file_stylish.yml');

  expect(genTree(path1, path2)).toBe(expected);
});
test('genTree to JSON case', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const expected = readFile('expected_file_JSON.yml');

  expect(genTree(path1, path2, 'json')).toBe(expected);
});
