import * as R from "ramda";
import fs from "fs-extra";
import {readString, readInt, readByte, readUByte} from "./byteReaders";
import {applyN, log} from "./utils";
import parseChunk from "./chunkParsers";

const parseFileHeader = buffer =>
  R.pipe(
    readString("id"),
    readInt("version")
  )({buffer});

const readDict = R.curry((key, {chunk = {}, buffer}) => {
  const out = R.pipe(readInt("numPairs"))({buffer});
  return {chunk: {[key]: out.chunk, ...chunk}, buffer: out.buffer};
});

const parsenTRN = ({chunk, buffer}) => {
  console.log(
    R.pipe(
      readInt("id"),
      readDict("attributes"),
      readInt("childNodeID"),
      readInt("reservedID"),
      readInt("layerID"),
      readInt("numFrames"),
      readDict("frameAttribute")
      // readDict("frameAttribute")
    )({buffer})
  );
  return {chunk, buffer};
};

fs.readFile("./src/test/vox/3x3x3rot.vox").then(buffer => {
  let out = R.pipe(
    parseFileHeader,
    parseChunk,
    parseChunk,
    parseChunk,
    parseChunk
  )(buffer);
  console.log(JSON.stringify(out.chunk, null, 4));
});
