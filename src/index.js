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

fs.readFile("./src/test/vox/3x3x3rot.vox").then(buffer => {
  let out = R.pipe(
    parseFileHeader,
    parseChunk,
    parseChunk,
    parseChunk,
    parseChunk
    // parseChunk
    // parseChunk
  )(buffer);
  console.log(JSON.stringify(out.chunk, null, 4));
});
