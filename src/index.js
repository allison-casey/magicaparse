import * as R from "ramda";
import fs from "fs-extra";
import {readString, readInt} from "./byteReaders";
import parseChunk from "./chunkParsers";

const parseFileHeader = buffer =>
  R.pipe(
    readString("id"),
    readInt("version")
  )({buffer});

fs.readFile("./src/test/vox/castle.vox").then(buffer => {
  let out = R.until(payload => !payload.buffer.length, parseChunk)(
    parseFileHeader(buffer)
  );
  console.log(JSON.stringify(out.chunk, null, 4));
  console.log(out.buffer.length);
});
