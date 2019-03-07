import * as R from "ramda";
import {readString, readInt} from "../byteReaders";
import {parseSize} from "./size";
import {parseXYZI} from "./xyzi";
import {parseRGBA} from "./rgba";
import {parsenTRN} from "./ntrn";
import {parsenGRP} from "./ngrp";
import {parsenSHP} from "./nshp";
import {parseLAYR} from "./layr";
import {parseMATL} from "./matl";
import {parserOBJ} from "./robj";

const chunkHeader = ({buffer}) =>
  R.pipe(
    readString("id"),
    readInt("chunkContent"),
    readInt("childChunks")
  )({buffer});

const updateArrayChunk = R.curry((id, body, chunk, header) => ({
  chunk: {
    ...chunk,
    [id]: [...(chunk[id] || []), {...header.chunk, ...body.chunk}]
  },
  buffer: body.buffer
}));

const updateChunk = R.curry((id, body, chunk, header) => ({
  chunk: {...chunk, [id]: {...header.chunk, ...body.chunk}},
  buffer: body.buffer
}));

const grabID = R.path(["chunk", "id"]);
const idEquals = key =>
  R.pipe(
    grabID,
    R.equals(key)
  );

const updateChunkCreator = R.curry((chunk, callback, payload) =>
  updateChunk(grabID(payload), callback(payload), chunk, payload)
);

const updateArrayChunkCreator = R.curry((chunk, callback, payload) =>
  updateArrayChunk(grabID(payload), callback(payload), chunk, payload)
);

// const createSwitch = (chunk, header) =>
//   R.cond([
//     [
//       idEquals("MAIN"),
//       updateChunk("MAIN", {chunk: {}, buffer: header.buffer}, chunk)
//     ],
//     [idEquals("SIZE"), updateChunkCreator(chunk, parseSize)],
//     [idEquals("XYZI"), updateChunkCreator(chunk, parseXYZI)],
//     [idEquals("RGBA"), updateChunkCreator(chunk, parseRGBA)],
//     [idEquals("nTRN"), updateArrayChunkCreator(chunk, parsenTRN)],
//     [idEquals("nGRP"), updateArrayChunkCreator(chunk, parsenGRP)],
//     [idEquals("nSHP"), updateArrayChunkCreator(chunk, parsenSHP)],
//     [idEquals("LAYR"), updateArrayChunkCreator(chunk, parseLAYR)],
//     [idEquals("MATL"), updateArrayChunkCreator(chunk, parseMATL)],
//     [idEquals("rOBJ"), updateArrayChunkCreator(chunk, parserOBJ)]
//   ]);

const parseChunk = ({chunk, buffer}) => {
  const header = chunkHeader({buffer});
  const id = R.path(["chunk", "id"], header);
  let body = {chunk: {}, buffer: header.buffer};

  // console.log(createSwitch(chunk, header)(header));

  switch (id) {
    case "MAIN":
      return updateChunk(
        "MAIN",
        {chunk: {}, buffer: header.buffer},
        chunk,
        header
      );
      break;
    case "SIZE":
      body = parseSize(header);
      return updateChunk(id, body, chunk, header);
      break;
    case "XYZI":
      body = parseXYZI(header);
      return updateChunk(id, body, chunk, header);
      break;
    case "RGBA":
      body = parseRGBA(header);
      return updateChunk(id, body, chunk, header);
      break;
    case "nTRN":
      body = parsenTRN(header);
      return updateArrayChunk(id, body, chunk, header);
      break;
    case "nGRP":
      body = parsenGRP(header);
      return updateArrayChunk(id, body, chunk, header);
      break;
    case "nSHP":
      body = parsenSHP(header);
      return updateArrayChunk(id, body, chunk, header);
      break;
    case "LAYR":
      body = parseLAYR(header);
      return updateArrayChunk(id, body, chunk, header);
      break;
    case "MATL":
      body = parseMATL(header);
      return updateArrayChunk(id, body, chunk, header);
    case "rOBJ":
      body = parserOBJ(header);
      return updateArrayChunk(id, body, chunk, header);
      break;
  }
};

export default parseChunk;
