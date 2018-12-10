import * as R from "ramda";
import {readString, readInt} from "../byteReaders";
import {parseSize} from "./size";
import {parseXYZI} from "./xyzi";
import {parseRGBA} from "./rgba";
import {parsenTRN} from "./ntrn";
import {parsenGRP} from "./ngrp";

const chunkHeader = ({buffer}) =>
  R.pipe(
    readString("id"),
    readInt("chunkContent"),
    readInt("childChunks")
  )({buffer});

const parseChunk = ({chunk, buffer}) => {
  const header = chunkHeader({buffer});
  const id = R.path(["chunk", "id"], header);
  let body = {chunk: {}, buffer: header.buffer};

  // console.log(header);

  switch (id) {
    case "SIZE":
      body = parseSize(header);
      break;
    case "XYZI":
      body = parseXYZI(header);
      break;
    case "nTRN":
      body = parsenTRN(header);
      return {
        chunk: {
          ...chunk,
          [id]: [...(chunk[id] || []), {...header.chunk, ...body.chunk}]
        },
        buffer: body.buffer
      };
      break;
    case "RGBA":
      body = parseRGBA(header);
      break;
    case "nGRP":
      body = parsenGRP(header);
      break;
    default:
      body = {chunk: {}, buffer: header.buffer};
  }
  return {
    chunk: {...chunk, [id]: {...header.chunk, ...body.chunk}},
    buffer: body.buffer
  };
};

export default parseChunk;
