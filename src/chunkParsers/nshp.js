import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";
import {readArrayProp} from "../utils";

export const parsenSHP = ({chunk, buffer}) =>
  R.pipe(
    readInt("nodeID"),
    readDict("attributes"),
    readInt("numModels"),
    payload =>
      R.pipe(
        R.path(["chunk", "numModels"]),
        readArrayProp(
          "models",
          R.pipe(
            readInt("modelID"),
            readDict("attributes")
          ),
          R.__,
          payload
        ),
        R.mergeDeepRight({chunk})
      )(payload)
  )({buffer});
