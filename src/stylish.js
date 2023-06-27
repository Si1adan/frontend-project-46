/* eslint-disable prefer-template */
import _ from 'lodash';
import stringify from './stringify.js';

const stylish = (diff) => {
  const [indPerLevel, offsetLeft] = [4, 2];
  const [replacer, comInd, O1Ind, O2Ind] = [' ', '  ', '- ', '+ '];

  const statusInd = (status) => {
    switch (status) {
      case '-':
        return O1Ind;
      case '+':
        return O2Ind;
      default:
        return comInd;
    }
  };

  const iter = (curVal, depth) => {
    const baseInd = depth * indPerLevel;
    const [bracketIndSize, indSize] = [baseInd - indPerLevel, baseInd - offsetLeft];
    const [bracketInd, curInd] = [replacer.repeat(bracketIndSize), replacer.repeat(indSize)];

    const lines = curVal?.map((prop) => {
      const { name } = prop;
      const genLine = (status, val) => `${curInd}${statusInd(status)}${name}: ${val}`;

      if (_.has(prop, 'value1')) {
        const { value1, value2 } = prop;
        return genLine('-', stringify(value1, depth + 1)) + '\n'
          + genLine('+', stringify(value2, depth + 1));
      }

      const { value, status } = prop;

      if (prop.status === 'arr') {
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
