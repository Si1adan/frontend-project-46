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

const iter = (acc, curVal) => curVal
  .filter(({ status }) => !_.isUndefined(status))
  .map((prop) => {
    const {
      name, status, value, value1, value2,
    } = prop;

    const resName = `${acc}${name}`;
    const nestedName = `${resName}.`;

    switch (status) {
      case 'updated':
        return `Property '${resName}' was updated. From ${normaliser(value1)} to ${normaliser(value2)}`;

      case 'nested':
        return iter(nestedName, value);

      case 'added':
        return `Property '${resName}' was added with value: ${normaliser(value)}`;

      case 'removed':
        return `Property '${resName}' was removed`;

      default:
        return '';
    }
  })
  .join('\n');

const plain = (diff) => iter('', diff);

export default plain;
