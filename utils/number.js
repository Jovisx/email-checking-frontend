import BigNumber from 'bignumber.js';

export const isNumber = value => !Number.isNaN(parseFloat(value));

export const formatSign = (value, prec) => {
  const numberValue = parseFloat(value);
  if (!isNumber(numberValue)) {
    return null;
  }
  const sign = numberValue >= 0 ? '+' : '-';
  return `${sign}${Math.abs(parseFloat(prec ? numberValue.toFixed(prec) : numberValue))}`;
};

export const plus = (a, b) => {
  if (!isNumber(a) || !isNumber(b)) {
    return null;
  }
  return new BigNumber(a).plus(new BigNumber(b));
};

export const minus = (a, b) => {
  if (!isNumber(a) || !isNumber(b)) {
    return null;
  }
  return new BigNumber(a).minus(new BigNumber(b));
};

export const multipliedBy = (a, b) => {
  if (!isNumber(a) || !isNumber(b)) {
    return null;
  }
  return new BigNumber(a).multipliedBy(new BigNumber(b));
};

export const dividedBy = (a, b) => {
  if (!isNumber(a) || !isNumber(b) || !b) {
    return 0;
  }
  return new BigNumber(a).dividedBy(new BigNumber(b));
};
