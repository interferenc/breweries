import { ref } from "vue";
import { string } from "./types";
import { router } from "@/ui/router";

jest.useFakeTimers();

jest.mock("vue-router", () => ({
  createWebHistory: () => {},
  createRouter: () => {
    const mockCurrentRoute = ref({ query: {} });
    return {
      push: (loc: { query: Record<string, string> }) => {
        mockCurrentRoute.value.query = { ...loc.query };
      },
      currentRoute: mockCurrentRoute
    };
  }
}));

describe("UI / Query State", () => {
  it("can read from the query string", () => {
    // arrange
    router.push({ query: { foo: "bar" } });
    const foo = string("foo");

    // act
    const result = foo.value;

    // assert
    expect(result).toBe("bar");
  });

  it("can write to the query string", () => {
    // arrange
    router.push({ query: { foo: "bar" } });
    const foo = string("foo");

    // act
    foo.value = "baz";
    jest.runAllTimers();

    // assert
    expect(router.currentRoute.value.query.foo).toBe("baz");
  });
});
