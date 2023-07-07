import _ from 'lodash';

const getSortedUniqKeys = (o1, o2) => {
  const [o1Keys, o2Keys] = [Object.keys(o1), Object.keys(o2)];

  return _.sortBy(_.uniq(_.concat(o1Keys, o2Keys)));
};

const iter = (o1, o2) => {
  const keys = getSortedUniqKeys(o1, o2);

  const lines = keys.map((key) => {
    const val1 = _.get(o1, key);
    const val2 = _.get(o2, key);

    switch (true) {
      case !_.has(o2, key):
        return { name: key, value: val1, status: 'removed' };

      case !_.has(o1, key):
        return { name: key, value: val2, status: 'added' };

      case val1 === val2:
        return { name: key, value: val1 };

      case _.isObject(val1) && _.isObject(val2):
        return { name: key, value: iter(val1, val2), status: 'nested' };

      default:
        return {
          name: key, value1: val1, value2: val2, status: 'updated',
        };
    }
  });

  return lines;
};

const genDiff = (obj1, obj2) => iter(obj1, obj2);

export default genDiff;
