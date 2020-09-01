import fetchMock from "jest-fetch-mock";
import { setHeaders } from "./header";

fetchMock.enableMocks();

describe("Http service / setHeaders", () => {
  it("adds passed header to a request", () => {
    // act
    const request = setHeaders(new Headers({ bar: "foo", baz: "bar" }))(
      new Request("https://someurl.com")
    );
    const bar = request.headers.get("bar");
    const baz = request.headers.get("baz");

    // assert
    expect(bar).toBe("foo");
    expect(baz).toBe("bar");
  });

  it("preserves unaffected keys", () => {
    // arrange
    const request = new Request("https://someurl.com", {
      headers: new Headers({
        foo: "bar"
      })
    });

    // act
    const requestWithNewHeaders = setHeaders(
      new Headers({ bar: "foo", baz: "bar" })
    )(request);
    const foo = requestWithNewHeaders.headers.get("foo");

    // assert
    expect(foo).toBe("bar");
  });

  it("overwrites existing keys", () => {
    // arrange
    const request = new Request("https://someurl.com", {
      headers: new Headers({
        foo: "bar"
      })
    });

    // act
    const requestWithNewHeaders = setHeaders(
      new Headers({ foo: "baz", baz: "bar" })
    )(request);
    const foo = requestWithNewHeaders.headers.get("foo");
    const baz = requestWithNewHeaders.headers.get("baz");

    // assert
    expect(foo).toBe("baz");
    expect(baz).toBe("bar");
  });
});
