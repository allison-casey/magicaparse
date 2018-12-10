import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";
import {readArrayProp} from "../utils";

export const parsenGRP = ({chunk, buffer}) =>
  R.pipe(
    readInt("id"),
    readDict("attributes"),
    readInt("numChildren"),
    payload =>
      R.pipe(
        R.path(["chunk", "numChildren"]),
        readArrayProp("childIDs", readInt("id"), R.__, payload),
        R.mergeDeepRight({chunk})
      )(payload)
  )({buffer});
