import * as R from "ramda";
import {readInt} from "../byteReaders";

export const parseSize = ({chunk, buffer}) =>
  R.pipe(
    readInt("x"),
    readInt("y"),
    readInt("z")
  )({buffer});
