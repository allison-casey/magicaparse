import * as R from "ramda";
import {readUByte} from "../byteReaders";
import {readArrayProp} from "../utils";

export const parseRGBA = ({chunk, buffer}) => {
  const out = readArrayProp(
    "colors",
    R.pipe(
      readUByte("r"),
      readUByte("g"),
      readUByte("b"),
      readUByte("a")
    ),
    256,
    {chunk, buffer}
  );

  return {chunk: {...chunk, ...out.chunk}, buffer: out.buffer};
};
