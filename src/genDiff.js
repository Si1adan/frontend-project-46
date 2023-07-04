import _ from 'lodash';

const getSortedUniqKeys = (o1, o2) => {
  const [o1Keys, o2Keys] = [Object.keys(o1), Object.keys(o2)];

  const sumOfKeys = _.concat(o1Keys, o2Keys);

  const uniqKeys = _.uniq(sumOfKeys);

  const sortedUniqKeys = _.sortBy(uniqKeys);

  return sortedUniqKeys;
};

const isCom = (obj1, obj2, prop) => _.has(obj1, prop) && _.has(obj2, prop);

const areValsObjs = (val1, val2) => _.isObject(val1) && _.isObject(val2);

const iter = (o1, o2) => {
  const keys = getSortedUniqKeys(o1, o2);

  const [S1, S2, S3, S4] = ['removed', 'added', 'updated', 'nested'];

  const lines = keys.map((key) => {
    const [val1, val2] = [o1[key], o2[key]];

    if (isCom(o1, o2, key)) {
      if (areValsObjs(val1, val2)) {
        return { name: key, value: iter(val1, val2), status: S4 };
      }

      if (val1 === val2) {
        return { name: key, value: val1 };
      }

      return {
        name: key, value1: val1, value2: val2, status: S3,
      };
    }

    return _.has(o1, key)
      ? { name: key, value: val1, status: S1 }
      : { name: key, value: val2, status: S2 };
  });

  return lines;
};

const genDiff = (obj1, obj2) => iter(obj1, obj2);

export default genDiff;
