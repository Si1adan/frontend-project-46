import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff main flow', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected_file.yml');

  expect(gendiff(file1, file2)).toBe(expected);
});
