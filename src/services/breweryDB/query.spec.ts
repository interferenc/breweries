import { string, number } from "./query";

describe("Brewery DB service / query string", () => {
  describe("String encoder", () => {
    it("encodes a string", () => {
      expect(string("bar")).toBe("bar");
    });
    it("encodes a string with spaces to underscore", () => {
      expect(string("bar foo")).toBe("bar_foo");
    });
  });

  describe("Number encoder", () => {
    it("encodes an integer", () => {
      expect(number(123)).toBe("123");
    });
    it("encodes a float", () => {
      expect(number(1.23)).toBe("1.23");
    });
  });
});
