import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import _ from 'lodash';

const cl = (...args) => console.log(...args);

const gendiff = (p1, p2) => {
  
  const path1 = resolve(`${p1}`);
  const path2 = resolve(`${p2}`);

  const file1 = readFileSync(path1);
  const file2 = readFileSync(path2);

  const pF1 = JSON.parse(file1);
  const pF2 = JSON.parse(file2);

  const f1 = pF1;
  const f2 = pF2;

  const f1Keys = Object.keys(f1);
  const f2Keys = Object.keys(f2);

  const sumOfKeys = _.concat(f1Keys, f2Keys);
  const uniqKeys = _.uniq(sumOfKeys);
  const sortedUKeys = _.sortBy(uniqKeys);

  let res = '';
  sortedUKeys.map((key) => {
    {
      if (_.has(f1, key) && _.has(f2, key) && f1[key] === f2[key]) {
        res += `    ${key}: ${f1[key]}\n`;
      } else if (_.has(f1, key) && _.has(f2, key)) {
        res += `  - ${key}: ${f1[key]}\n  + ${key}: ${f2[key]}\n`;
      } else if (_.has(f1, key)) {
        res += `  - ${key}: ${f1[key]}\n`;
      } else {
        res += `  + ${key}: ${f2[key]}\n`;
      };
    }
  });
  const trueRes = `{\n${res}}`;

  return trueRes;
};

export default gendiff;
