import { extname } from 'path';
import { load } from 'js-yaml';

const parse = (path, buffer) => (
  extname(path) === '.yml' || extname(path) === '.yaml'
    ? load(buffer)
    : JSON.parse(buffer));

export default parse;
