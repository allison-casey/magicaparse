import * as R from "ramda";

export const applyN = R.compose(
  R.reduceRight(R.compose, R.identity),
  R.repeat
);

export const log = args => {
  console.log(args);
  return args;
};

export const readArrayProp = R.curry(
  (key, callback, repeat, {chunk = {}, buffer}) =>
    applyN(payload => {
      const out = callback({buffer: payload.buffer});
      return {
        chunk: {[key]: [...payload.chunk[key], out.chunk]},
        buffer: out.buffer
      };
    }, repeat)({
      chunk: {[key]: []},
      buffer
    })
);
