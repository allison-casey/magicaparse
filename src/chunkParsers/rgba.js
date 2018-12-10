import * as R from "ramda";
import {readUByte} from "../byteReaders";
import {readArrayProp, log} from "../utils";

export const parseRGBA = payload =>
  R.pipe(
    readArrayProp(
      "colors",
      R.pipe(
        readUByte("r"),
        readUByte("g"),
        readUByte("b"),
        readUByte("a")
      ),
      256
    ),
    R.mergeDeepRight({chunk: payload.chunk})
  )(payload);
