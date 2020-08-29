import {
  stringEncoder,
  stringDecoder,
  numberEncoder,
  numberDecoder
} from "@/ui/router/query";
import { SetupContext } from "vue";
import { queryState } from "./queryState";

export const number = (key: string, fallback: number, context: SetupContext) =>
  queryState<number>(
    key,
    numberEncoder,
    numberDecoder,
    numberEncoder(fallback),
    context
  );

export const string = (
  key: string,
  fallback: string,
  context: SetupContext,
  debounce = true
) =>
  queryState<string>(
    key,
    stringEncoder,
    stringDecoder,
    stringEncoder(fallback),
    context,
    debounce
  );
