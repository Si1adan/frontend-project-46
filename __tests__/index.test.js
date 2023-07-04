import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genTree from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const [pathJSON1, pathJSON2, pathYML1, pathYML2] = [
  'file1.json', 'file2.json', 'file1.yml', 'file2.yml',
]
  .map((name) => getFixturePath(name));

const [expectedJSON, expectedPlain, expectedStylish] = [
  'expected_file_JSON.yml', 'expected_file_plain.yml', 'expected_file_stylish.yml',
]
  .map((name) => readFile(name));

const testData1 = [
  {
    path1: pathJSON1, path2: pathJSON2, expected: expectedStylish, type: 'JS',
  },
  {
    path1: pathYML1, path2: pathYML2, expected: expectedStylish, type: 'YML',
  },
];

const testData2 = [
  {
    path1: pathYML1, path2: pathYML2, expected: expectedPlain, type: 'plain',
  },
  {
    path1: pathJSON1, path2: pathJSON2, expected: expectedJSON, type: 'json',
  },
];

const testData3 = {
  path1: pathJSON1, path2: pathJSON2, expected: 'format txt is not supported', type: 'txt',
};

describe('genTree tests', () => {
  test.each(testData1)('$type case', ({ path1, path2, expected }) => expect(genTree(path1, path2)).toBe(expected));

  test.each(testData2)('$type case', ({
    path1, path2, expected, type,
  }) => expect(genTree(path1, path2, type)).toBe(expected));

  test.failing('txt case', () => {
    const {
      path1, path2, expected, type,
    } = testData3;
    expect(genTree(path1, path2, type)).toThrow(Error, expected);
  });
});
