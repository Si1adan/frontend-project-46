import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';
import plain from '../src/formatters/plain.js';
import pathResolveToObj from '../src/pathResolver.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('plain main flow', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const file1 = pathResolveToObj(path1);
  const file2 = pathResolveToObj(path2);
  const expected = readFile('expected_file_plain.yml');

  expect(plain(genDiff(file1, file2))).toBe(expected);
});
