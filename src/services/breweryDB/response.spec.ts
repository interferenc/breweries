import { ApiResponse, validate } from "./response";
import { isRight, isLeft } from "fp-ts/lib/Either";

describe("BreweryDB ApiResponse", () => {
  describe("Validator", () => {
    it("returns the ApiResponse as the Right value when the response is okay", async () => {
      // arrange
      const apiResponse = new ApiResponse(true, 200, new Headers(), {});

      // act
      const result = await validate(apiResponse)();

      //assert
      expect(isRight(result)).toBe(true);
    });

    it("returns an ApiError as the Left value when the response is not okay", async () => {
      // arrange
      const apiResponse = new ApiResponse(false, 500, new Headers(), {});

      // act
      const result = await validate(apiResponse)();

      //assert
      expect(isLeft(result)).toBe(true);
    });

    it("sets the correct error code to the created ApiError object", async () => {
      // arrange
      const apiResponse = new ApiResponse(false, 500, new Headers(), {});

      // act
      const result = await validate(apiResponse)();

      //assert
      if (isLeft(result)) expect(result.left.code).toBe(500);
    });
  });
});
