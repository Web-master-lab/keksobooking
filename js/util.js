const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomPositiveFraction = (a, b, decimals) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  return Number((Math.random() * (upper - lower + 1) + lower).toFixed(decimals));
};

export {getRandomPositiveInteger, getRandomPositiveFraction};

