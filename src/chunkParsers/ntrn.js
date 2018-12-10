import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";

export const parsenTRN = ({chunk, buffer}) =>
  R.pipe(
    readInt("id"),
    readDict("attributes"),
    readInt("childNodeID"),
    readInt("reservedID"),
    readInt("layerID"),
    readInt("numFrames"),
    readDict("frameAttribute")
  )({buffer});
