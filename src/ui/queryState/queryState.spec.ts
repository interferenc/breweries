import { ref } from "vue";
import { string, number } from "./types";
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

  it("debounces writes to the query string", () => {
    // arrange
    router.push({ query: { foo: "bar" } });
    const foo = string("foo");

    // assert
    foo.value = "baz";
    expect(router.currentRoute.value.query.foo).toBe("bar");
    jest.advanceTimersByTime(100);
    expect(router.currentRoute.value.query.foo).toBe("bar");
    foo.value = "daz";
    expect(router.currentRoute.value.query.foo).toBe("bar");
    jest.advanceTimersByTime(500); // the debounce timeout
    expect(router.currentRoute.value.query.foo).toBe("daz");
  });

  it("encodes a number properly", () => {
    // arrange
    router.push({ query: {} });
    const foo = number("foo");

    // act
    foo.value = 199;
    jest.runAllTimers();

    // assert
    expect(router.currentRoute.value.query.foo).toBe("199");
  });

  it("decodes a number properly", () => {
    // arrange
    router.push({ query: { foo: "199" } });

    // act
    const foo = number("foo");

    // assert
    expect(foo.value).toBe(199);
  });
});
