import * as R from "ramda";
import {readInt} from "../byteReaders";
import {log} from "../utils";

const readDict = R.curry((key, {chunk = {}, buffer}) => {
  const out = R.pipe(readInt("numPairs"))({buffer});
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
