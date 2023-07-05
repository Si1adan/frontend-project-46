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

const iter = (curVal, depth) => {
  const baseInd = depth * indPerLevel;

  const [bracketInd, curInd] = [
    replacer.repeat(baseInd - indPerLevel),
    replacer.repeat(baseInd - offsetLeft),
  ];

  return [
    '{',
    ...curVal.map((prop) => {
      const {
        name, value, status, value1, value2,
      } = prop;

      switch (status) {
        case 'updated':
          return `${curInd}${O1Ind}${name}: ${stringify(value1, depth + 1)}\n${curInd}${O2Ind}${name}: ${stringify(value2, depth + 1)}`;

        case 'nested':
          return `${curInd}${comInd}${name}: ${iter(value, depth + 1)}`;

        case 'removed':
          return `${curInd}${O1Ind}${name}: ${stringify(value, depth + 1)}`;

        case 'added':
          return `${curInd}${O2Ind}${name}: ${stringify(value, depth + 1)}`;

        default:
          return `${curInd}${comInd}${name}: ${stringify(value, depth + 1)}`;
      }
    }),
    `${bracketInd}}`,
  ].join('\n');
};

const stylish = (diff) => iter(diff, 1);

export default stylish;
