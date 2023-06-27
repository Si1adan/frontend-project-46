import _ from 'lodash';
import getSortedUniqKeys from './get-keys.js';

const isCom = (obj1, obj2, prop) => _.has(obj1, prop) && _.has(obj2, prop);

const areValsObjs = (val1, val2) => _.isObject(val1) && _.isObject(val2);

const getDiff = (obj1, obj2) => {
  const iter = (o1, o2) => {
    const keys = getSortedUniqKeys(o1, o2);
    const [O1, O2] = ['-', '+'];

    const lines = keys.map((key) => {
      const [val1, val2] = [o1[key], o2[key]];

      if (isCom(o1, o2, key)) {
        if (areValsObjs(val1, val2)) {
          return { name: key, value: iter(val1, val2), status: 'arr' };
        }
        if (val1 === val2) {
          return { name: key, value: val1 };
        }

        return { name: key, value1: val1, value2: val2 };
      }

      return _.has(o1, key)
        ? { name: key, value: val1, status: O1 }
        : { name: key, value: val2, status: O2 };
    });

    return lines;
  };

  return iter(obj1, obj2);
};

export default getDiff;
