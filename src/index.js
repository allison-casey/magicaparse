import * as R from "ramda";
import fs from "fs-extra";
import {readString, readInt} from "./byteReaders";
import parseChunk from "./chunkParsers";

const parseFileHeader = buffer =>
  R.pipe(
    readString("id"),
    readInt("version")
  )({buffer});

fs.readFile("./src/test/vox/3x3x3.vox").then(buffer => {
  let out = R.until(payload => !payload.buffer.length, parseChunk)(
    parseFileHeader(buffer)
  );
  console.log(JSON.stringify(out, null, 4));
});
