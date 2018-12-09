import * as R from "ramda";
import {readByte, readInt} from "../byteReaders";
import {applyN} from "../utils";

const readXYZIComponents = ({chunk = {}, buffer}) =>
  R.pipe(
    readByte("x"),
    readByte("y"),
    readByte("z"),
    readByte("i")
  )({buffer});

export const parseXYZI = ({chunk, buffer}) => {
  return R.pipe(
    readInt("numVoxels"),
    payload => {
      const numVoxels = R.path(["chunk", "numVoxels"], payload);
      const body = applyN(payload => {
        const component = readXYZIComponents(payload);
        return {
          chunk: {
            ...payload.chunk,
            voxels: [...payload.chunk.voxels, component.chunk]
          },
          buffer: component.buffer
        };
      }, numVoxels)({
        chunk: {voxels: [], ...payload.chunk},
        buffer: payload.buffer
      });
      return body;
    }
  )({buffer});
};
