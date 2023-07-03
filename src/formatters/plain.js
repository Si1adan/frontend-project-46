import _ from 'lodash';

const normaliser = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`;
  }

  if (_.isObject(val)) {
    return '[complex value]';
  }

  return val;
};

const getStatus = (stat, val1, val2) => {
  switch (stat) {
    case 'added':
      return `added with value: ${val1}`;
    case 'removed':
      return 'removed';
    default:
      return `updated. From ${val1} to ${val2}`;
  }
};

const genLine = (curProp, stat, val1, val2) => {
  const [normVal1, normVal2] = [normaliser(val1), normaliser(val2)];

  return `Property '${curProp}' was ${getStatus(stat, normVal1, normVal2)}`;
};

const iter = (acc, curVal) => {
  const lines = curVal
    .filter(({ status }) => !_.isUndefined(status))
    .map((prop) => {
      const { name, status } = prop;

      const resName = `${acc}${name}`;

      if (status === 'updated') {
        const { value1, value2 } = prop;

        return genLine(resName, 'updated', value1, value2);
      }

      const { value } = prop;

      if (status === 'nested') {
        const nestedName = `${resName}.`;

        return iter(nestedName, value);
      }

      return genLine(resName, status, value);
    });

  return lines.join('\n');
};

const plain = (diff) => iter('', diff);

export default plain;
