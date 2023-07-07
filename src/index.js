import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import parse from './parsers.js';
import genDiff from './genDiff.js';
import format from './formatters/index.js';

const pathResolveToObj = (p) => {
  const path = resolve(`${p}`);

  const file = readFileSync(path);

  const extension = extname(path).slice(1);

  const parsedFile = parse(extension, file);

  return parsedFile;
};

const genTree = (path1, path2, formatName = 'stylish') => {
  const obj1 = pathResolveToObj(path1);
  const obj2 = pathResolveToObj(path2);

  const diff = genDiff(obj1, obj2);

  const styledDiff = format(diff, formatName);

  return styledDiff;
};

export default genTree;
