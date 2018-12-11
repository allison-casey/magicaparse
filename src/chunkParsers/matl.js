import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";

export const parseMATL = ({chunk, buffer}) =>
  R.pipe(
    readInt("materialID"),
    readDict("properties")
  )({buffer});
