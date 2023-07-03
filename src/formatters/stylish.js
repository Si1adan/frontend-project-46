/* eslint-disable prefer-template */
import _ from 'lodash';
import stringify from '../stringify.js';

const stylish = (diff) => {
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

      if (prop.status === 'updated') {
        const { value1, value2 } = prop;

        return genLine('removed', stringify(value1, depth + 1)) + '\n'
          + genLine('added', stringify(value2, depth + 1));
      }

      const { value, status } = prop;

      if (prop.status === 'nested') {
        return genLine(status, iter(value, depth + 1));
      }

      if (_.isObject(value)) {
        return genLine(status, stringify(value, depth + 1));
      }

      return genLine(status, value);
    });

    return [
      '{',
      ...lines,
      `${bracketInd}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

export default stylish;
