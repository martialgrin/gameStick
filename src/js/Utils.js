const ElementIsLoading = (condition, result, debug) => {
  if (condition == true) {
    result;
  } else {
    requestAnimationFrame(ElementIsLoading);
  }
};

// Calculate difference between numbers,
//it allows to have the center point for the hip for example
const difference = (n1, n2) => {
  return n1 + Math.abs(n1 - n2) / 2;
};

const map = (n, start1, stop1, start2, stop2) => {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  return newval;
};

const calcAtan = (x1, y1, x2, y2) => {
  const adj = Math.abs(x1 - x2);
  const opp = Math.abs(y1 - y2);
  console.log(opp, adj);
  console.log(Math.atan(opp / adj));

  return Math.atan(opp / adj);
};

const calcHypotenus = (x, y) => {
  return Math.sqrt(x * x + y * y);
};
const calcSin = (opp1, opp2, hyp) => {
  return Math.asin(Math.abs(opp2 - opp1) / hyp);
};

export { calcAtan, difference, map, calcSin, calcHypotenus, ElementIsLoading };
