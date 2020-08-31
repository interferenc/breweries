import { h } from "vue";
import { fold } from "fp-ts/lib/Option";
import { VNodes } from "../types";

const emptyVNode = () => null;
const emptyString = () => "";

/**
 * Folds an `Option<string>` into its value or an empty string
 * @param option The Option to fold
 */
export const toString = fold(emptyString, (v: string) => v);

/**
 * Folds an `Option<T>` into VNodes using the passed callback or to null
 * @param onSome the callback to use to convert the T value to VNodes
 */
export const toVNodes = <T>(onSome: (v: T) => VNodes) =>
  fold(emptyVNode, onSome);

/**
 * Folds an `Option<string>` into an anchor tag or nothing
 */
export const toLink = toVNodes((v: string) => h("a", { href: v }, v));

/**
 * Folds an `Option<string>` into a paragraph or nothing
 */
export const toParagraph = toVNodes((v: string) => h("p", v));
