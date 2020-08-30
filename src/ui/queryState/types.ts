import {
  stringEncoder,
  stringDecoder,
  numberEncoder,
  numberDecoder
} from "@/ui/router/query";
import { queryState } from "./queryState";

export const number = (key: string, fallback = 0) =>
  queryState<number>(
    key,
    numberEncoder,
    numberDecoder,
    numberEncoder(fallback)
  );

export const string = (key: string, fallback = "") =>
  queryState<string>(
    key,
    stringEncoder,
    stringDecoder,
    stringEncoder(fallback)
  );
