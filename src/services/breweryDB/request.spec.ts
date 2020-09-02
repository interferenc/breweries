import fetchMock from "jest-fetch-mock";
import { authorizedApiGetRequest } from "./request";

fetchMock.enableMocks();

describe("Brewery DB service / request", () => {
  describe("authorizedApiGetRequest function", () => {
    it("create a Request with the auth headers", () => {
      //act
      const request = authorizedApiGetRequest("https://someurl.com");

      //assert
      expect(request.headers.get("Authorization")).toBe("Bearer token");
    });
  });
});
