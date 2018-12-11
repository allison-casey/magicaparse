import * as R from "ramda";
import {readInt, readDict} from "../byteReaders";

export const parserOBJ = ({chunk, buffer}) =>
  R.pipe(readDict("attributes"))({buffer});
//   console.log(out.chunk);
//   return {chunk, buffer};
// };
