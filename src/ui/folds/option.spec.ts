import { toString, toVNodes, toLink, toParagraph } from "./option";
import { some, none } from "fp-ts/lib/Option";
import { h } from "vue";

describe("UI / Folds / Option", () => {
  describe("toString function", () => {
    it("folds a some value to the contained string", () => {
      expect(toString(some("foo"))).toBe("foo");
    });

    it("folds a none value to the contained string", () => {
      expect(toString(none)).toBe("");
    });
  });

  describe("toVNodes function", () => {
    it("folds a some value to the contained value using the callback", () => {
      expect(toVNodes((i: string) => h("div", i))(some("foo"))).toStrictEqual(
        h("div", "foo")
      );
    });

    it("folds a none value to null", () => {
      expect(toVNodes((i: string) => h("div", i))(none)).toBeNull();
    });
  });

  describe("toLink function", () => {
    it("folds a some value to an anchor VNode", () => {
      expect(toLink(some("https://someurl.com"))).toStrictEqual(
        h("a", { href: "https://someurl.com" }, "https://someurl.com")
      );
    });

    it("folds a none value to null", () => {
      expect(toLink(none)).toBeNull();
    });
  });

  describe("toParagraph function", () => {
    it("folds a some value to a paragraph VNode", () => {
      expect(toParagraph(some("foo"))).toStrictEqual(h("p", "foo"));
    });

    it("folds a none value to null", () => {
      expect(toParagraph(none)).toBeNull();
    });
  });
});
