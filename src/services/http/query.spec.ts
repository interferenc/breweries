import fetchMock from "jest-fetch-mock";
import { setQuery } from "./query";

fetchMock.enableMocks();

describe("Http service / setQuery", () => {
  it("adds passed queries to a request", () => {
    // act
    const request = setQuery(new URLSearchParams({ bar: "foo", baz: "bar" }))(
      new Request("https://someurl.com")
    );
    const url = new URL(request.url);
    const bar = url.searchParams.get("bar");
    const baz = url.searchParams.get("baz");

    // assert
    expect(bar).toBe("foo");
    expect(baz).toBe("bar");
  });

  it("preserves unaffected keys", () => {
    // arrange
    const request = new Request("https://someurl.com?foo=bar");

    // act
    const requestWithNewHeaders = setQuery(
      new URLSearchParams({ bar: "foo", baz: "bar" })
    )(request);
    const url = new URL(requestWithNewHeaders.url);
    const foo = url.searchParams.get("foo");

    // assert
    expect(foo).toBe("bar");
  });

  it("overwrites existing keys", () => {
    // arrange
    const request = new Request("https://someurl.com?foo=bar");

    // act
    const requestWithNewHeaders = setQuery(
      new URLSearchParams({ foo: "baz", baz: "bar" })
    )(request);
    const url = new URL(requestWithNewHeaders.url);
    const foo = url.searchParams.get("foo");
    const baz = url.searchParams.get("baz");

    // assert
    expect(foo).toBe("baz");
    expect(baz).toBe("bar");
  });
});
