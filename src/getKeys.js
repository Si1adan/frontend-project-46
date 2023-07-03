import _ from 'lodash';

const getSortedUniqKeys = (o1, o2) => {
  const [o1Keys, o2Keys] = [Object.keys(o1), Object.keys(o2)];

  const sumOfKeys = _.concat(o1Keys, o2Keys);
  const uniqKeys = _.uniq(sumOfKeys);
  const sortedUniqKeys = _.sortBy(uniqKeys);

  return sortedUniqKeys;
};

export default getSortedUniqKeys;
