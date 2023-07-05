import { load } from 'js-yaml';

const parse = (extension, buffer) => (
  extension === 'yml' || extension === 'yaml'
    ? load(buffer)
    : JSON.parse(buffer));

export default parse;
