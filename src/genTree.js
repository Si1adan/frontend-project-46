import pathResolveToObj from './pathResolver.js';
import genDiff from './genDiff.js';
import format from './formatters/index.js';

const genTree = (path1, path2, formatName = 'stylish') => {
  const [obj1, obj2] = [pathResolveToObj(path1), pathResolveToObj(path2)];

  const diff = genDiff(obj1, obj2);

  const styledDiff = format(diff, formatName);

  return styledDiff;
};

export default genTree;
