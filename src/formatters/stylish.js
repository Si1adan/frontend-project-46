/* eslint-disable prefer-template */
import _ from 'lodash';

const stringify = (value, depth, indPerLevel = 4, replacer = ' ') => {
  const iter = (currentValue, innerDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = innerDepth * indPerLevel;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - indPerLevel);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, innerDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

const [indPerLevel, offsetLeft] = [4, 2];

const [replacer, comInd, O1Ind, O2Ind] = [' ', '  ', '- ', '+ '];

const statusInd = (status) => {
  switch (status) {
    case 'removed':
      return O1Ind;
    case 'added':
      return O2Ind;
    default:
      return comInd;
  }
};

const iter = (curVal, depth) => {
  const baseInd = depth * indPerLevel;

  const [bracketIndSize, indSize] = [baseInd - indPerLevel, baseInd - offsetLeft];

  const [bracketInd, curInd] = [replacer.repeat(bracketIndSize), replacer.repeat(indSize)];

  const lines = curVal.map((prop) => {
    const { name } = prop;

    const genLine = (status, val) => `${curInd}${statusInd(status)}${name}: ${val}`;

    const {
      value, status, value1, value2,
    } = prop;

    switch (prop.status) {
      case 'updated':

        return genLine('removed', stringify(value1, depth + 1)) + '\n'
        + genLine('added', stringify(value2, depth + 1));

      case 'nested':

        return genLine(status, iter(value, depth + 1));

      default:

        if (_.isObject(value)) {
          return genLine(status, stringify(value, depth + 1));
        }

        return genLine(status, value);
    }
  });

  return [
    '{',
    ...lines,
    `${bracketInd}}`,
  ].join('\n');
};

const stylish = (diff) => iter(diff, 1);

export default stylish;
