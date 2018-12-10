import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";

export const parsenGRP = ({chunk, buffer}) =>
  R.pipe(
    readInt("id"),
    readDict("attributes"),
    readInt("numChildren"),
    readInt("childNode")
  )({buffer});
