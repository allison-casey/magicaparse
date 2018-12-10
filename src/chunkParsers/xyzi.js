import * as R from "ramda";
import {readByte, readInt} from "../byteReaders";
import {readArrayProp} from "../utils";

const readXYZIComponents = ({chunk = {}, buffer}) =>
  R.pipe(
    readByte("x"),
    readByte("y"),
    readByte("z"),
    readByte("i")
  )({buffer});

export const parseXYZI = ({chunk, buffer}) =>
  R.pipe(
    readInt("numVoxels"),
    payload =>
      R.pipe(
        R.path(["chunk", "numVoxels"]),
        readArrayProp("voxels", readXYZIComponents, R.__, payload)
      )(payload)
  )({buffer});
