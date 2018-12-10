import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";
import {log, readArrayProp} from "../utils";

export const parsenTRN = ({chunk, buffer}) => {
  const out = R.pipe(
    readInt("id"),
    readDict("attributes"),
    readInt("childNodeID"),
    readInt("reservedID"),
    readInt("layerID"),
    readInt("numFrames"),
    readDict("frameAttribute")
  )({buffer});
  return out;
};
