let data = {
  a: {
    a: 'a',
    b: 1,
  },
  b: {
    b: 1,
  },
  c: {
    c: {
      e: 'e',
      b: {
        c: 'c',
        a: 1,
      },
    },
  },
};

let sum = 0;
const sumCalcFunc = obj => {
  for (const val in obj) {
    if (typeof obj[val] === 'number') {
      sum += obj[val];
    } else if (typeof obj[val] === 'object') {
      sumCalcFunc(obj[val]);
    }
  }
  return sum;
};

console.log(sumCalcFunc(data));
