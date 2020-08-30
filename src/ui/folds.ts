import { h } from "vue";
import { fold } from "fp-ts/lib/Option";
import { VNodes } from "./types";

export const toString = fold(
  () => "-",
  (value: string) => value
);

export const toVNodes = <T>(onSome: (value: T) => VNodes) =>
  fold(() => null, onSome);

export const toLink = toVNodes((href: string) => h("a", { href }, href));
export const toParagraph = toVNodes((text: string) => h("p", text));
