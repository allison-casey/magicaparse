import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";

export const parseLAYR = ({chunk, buffer}) =>
  R.pipe(
    readInt("layerID"),
    readDict("attributes"),
    readInt("reserved")
  )({buffer});
