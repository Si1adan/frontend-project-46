import pathResolveToObj from './pathresolver.js';
import getDiff from './diff.js';
import stylish from './stylish.js';

const gendiff = (path1, path2) => {
  const [obj1, obj2] = [pathResolveToObj(path1), pathResolveToObj(path2)];

  const diff = getDiff(obj1, obj2);

  const styledDiff = stylish(diff);

  return styledDiff;
};

export default gendiff;
