import * as R from "ramda";
import {readInt, readVariableString} from "../byteReaders";
import {log, readArrayProp} from "../utils";

const readDict = R.curry((key, {chunk = {}, buffer}) => {
  const out = R.pipe(
    readInt("numPairs"),
    payload =>
      R.pipe(
        R.path(["chunk", "numPairs"]),
        readArrayProp(
          "pairs",
          R.pipe(
            readVariableString("key"),
            readVariableString("value")
          ),
          R.__,
          payload
        )
      )(payload)
  )({buffer});

  return {chunk: {[key]: out.chunk, ...chunk}, buffer: out.buffer};
});

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
