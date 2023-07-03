import { readFileSync } from 'fs';
import { resolve } from 'path';
import parse from './parsers.js';

const pathResolveToObj = (p) => {
  const path = resolve(`${p}`);
  const file = readFileSync(path);
  const parsedFile = parse(path, file);

  return parsedFile;
};

export default pathResolveToObj;
