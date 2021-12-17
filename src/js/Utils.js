import { AmbientLight } from "three";

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
  if (n1 < n2) {
    return n1 + Math.abs(n1 - n2) / 2;
  } else {
    return n2 + Math.abs(n2 - n1) / 2;
  }
};

const map = (n, start1, stop1, start2, stop2) => {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  return newval;
};

const calcAtan = (x1, y1, x2, y2) => {
  const adj = Math.abs(x1 - x2);
  const opp = Math.abs(y1 - y2);
  return Math.atan(opp / adj);
};

const calcRadian = (x1, y1, x2, y2) => {
  const x = x2 - x1;
  const y = y2 - y1;
  const h = Math.atan2(y, x);
  return h;
};

const radianToDegree = (val) => {
  return (val * 180) / Math.PI;
};

const calcHypotenus = (x, y) => {
  return Math.sqrt(x * x + y * y);
};
const calcSin = (opp1, opp2, hyp) => {
  return Math.asin(Math.abs(opp2 - opp1) / hyp);
};
const lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

const easeElastic = (elapsed, initialValue, amountOfChange, duration) => {
  let s = 1.70158;
  let p = 0;
  let a = amountOfChange;
  if (elapsed === 0) {
    return initialValue;
  }
  if ((elapsed /= duration) === 2) {
    return initialValue + amountOfChange;
  }
  if (!p) {
    // Sprin
    p = duration * 0.3;
  }
  if (a < Math.abs(amountOfChange)) {
    a = amountOfChange;
    s = p / 4;
  } else {
    s = (p / (2 * Math.PI)) * Math.asin(amountOfChange / a);
  }
  return (
    -(
      a *
      Math.pow(2, 10 * (elapsed -= 1)) *
      Math.sin(((elapsed * duration - s) * (2 * Math.PI)) / p)
    ) + initialValue
  );
};

function elastic(elapsed, initialValue, amountOfChange, duration) {
  let s = 1.70158;
  let p = 0;
  let a = amountOfChange;
  if (elapsed === 0) {
    return initialValue;
  }
  if ((elapsed /= duration / 2) === 2) {
    return initialValue + amountOfChange;
  }
  if (!p) {
    // Spring
    p = duration * (0.6 * 1.5);
  }
  if (a < Math.abs(amountOfChange)) {
    a = amountOfChange;
    s = p / 4;
  } else {
    s = (p / (2 * Math.PI)) * Math.asin(amountOfChange / a);
  }
  if (elapsed < 1) {
    return (
      -0.5 *
        (a *
          Math.pow(2, 10 * (elapsed -= 1)) *
          Math.sin(((elapsed * duration - s) * (2 * Math.PI)) / p)) +
      initialValue
    );
  }
  return (
    a *
      Math.pow(2, -10 * (elapsed -= 1)) *
      Math.sin(((elapsed * duration - s) * (2 * Math.PI)) / p) *
      0.5 +
    amountOfChange +
    initialValue
  );
}

export {
  elastic,
  easeElastic,
  lerp,
  radianToDegree,
  calcRadian,
  calcAtan,
  difference,
  map,
  calcSin,
  calcHypotenus,
  ElementIsLoading,
};
