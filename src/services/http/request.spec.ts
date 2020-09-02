import fetchMock from "jest-fetch-mock";
import { getRequest, postRequest, putRequest, deleteRequest } from "./request";

fetchMock.enableMocks();

describe("Http service / Request", () => {
  describe("getRequest function", () => {
    it("creates a get request with the proper URL", () => {
      // act
      const request = getRequest("https://someurl.com");

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "get" })
      );
    });
  });

  describe("postRequest function", () => {
    it("creates a post request with the proper URL", () => {
      // act
      const request = postRequest("https://someurl.com");

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "post" })
      );
    });
  });

  describe("putRequest function", () => {
    it("creates a put request with the proper URL", () => {
      // act
      const request = putRequest("https://someurl.com");

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "put" })
      );
    });
  });

  describe("deleteRequest function", () => {
    it("creates a delete request with the proper URL", () => {
      // act
      const request = deleteRequest("https://someurl.com");

      // assert
      expect(request).toStrictEqual(
        new Request("https://someurl.com", { method: "delete" })
      );
    });
  });
});
