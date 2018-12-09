import * as R from "ramda";

export const applyN = R.compose(
  R.reduceRight(R.compose, R.identity),
  R.repeat
);

export const log = args => {
  console.log(args);
  return args;
};
