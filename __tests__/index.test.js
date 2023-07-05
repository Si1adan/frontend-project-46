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

const testData1 = [
  {
    path1: pathJSON1, path2: pathJSON2, expected: readFile('expected_file_stylish.yml'), type: 'JS',
  },
  {
    path1: pathYML1, path2: pathYML2, expected: readFile('expected_file_stylish.yml'), type: 'YML',
  },
  {
    path1: pathYML1, path2: pathYML2, expected: readFile('expected_file_plain.yml'), type: 'plain',
  },
  {
    path1: pathJSON1, path2: pathJSON2, expected: readFile('expected_file_JSON.yml'), type: 'json',
  },
];

const testData2 = {
  path1: pathJSON1, path2: pathJSON2, expected: 'format txt is not supported', type: 'txt',
};

describe('genTree tests', () => {
  test.each(testData1)('$type case', ({
    path1, path2, expected, type,
  }) => (type === 'JS' || type === 'YML'
    ? expect(genTree(path1, path2)).toBe(expected)
    : expect(genTree(path1, path2, type)).toBe(expected)));

  test.failing('txt case', () => {
    const {
      path1, path2, expected, type,
    } = testData2;
    expect(genTree(path1, path2, type)).toThrow(Error, expected);
  });
});
