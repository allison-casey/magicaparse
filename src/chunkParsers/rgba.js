import * as R from "ramda";
import {readUByte} from "../byteReaders";
import {applyN} from "../utils";

export const parseRGBA = ({chunk, buffer}) => {
  const out = applyN(payload => {
    const color = R.pipe(
      readUByte("r"),
      readUByte("b"),
      readUByte("g"),
      readUByte("a")
    )({buffer: payload.buffer});
    return {
      chunk: {colors: [...payload.chunk.colors, color.chunk]},
      buffer: color.buffer
    };
  }, 256)({chunk: {colors: []}, buffer});
  return {chunk: {...chunk, ...out.chunk}, buffer: out.buffer};
};
