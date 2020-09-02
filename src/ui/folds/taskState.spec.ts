import { h } from "vue";
import { ApiTaskState } from "../concerns/apiTask/ApiTaskState";
import { toVNodes } from "./taskState";
import { ApiError } from "@/services/breweryDB";

describe("UI / Folds / taskState", () => {
  describe("toVNodes function", () => {
    it("folds an initial TaskState using the onInitial callback", () => {
      // arrange
      const taskState: ApiTaskState<string> = { pending: false };

      // act
      const result = toVNodes(
        () => h("div", "initial"),
        () => h("div", "pending"),
        () => h("div", "error"),
        () => h("div", "result")
      )(taskState);

      // assert
      expect(result).toStrictEqual(h("div", "initial"));
    });

    it("folds a pending TaskState using the onPending callback", () => {
      // arrange
      const taskState: ApiTaskState<string> = { pending: true };

      // act
      const result = toVNodes(
        () => h("div", "initial"),
        () => h("div", "pending"),
        () => h("div", "error"),
        () => h("div", "result")
      )(taskState);

      // assert
      expect(result).toStrictEqual(h("div", "pending"));
    });

    it("folds an error TaskState using the onError callback", () => {
      // arrange
      const taskState: ApiTaskState<string> = {
        pending: false,
        error: new ApiError(500)
      };

      // act
      const result = toVNodes(
        () => h("div", "initial"),
        () => h("div", "pending"),
        error => h("div", `error: ${error.code}`),
        () => h("div", "result")
      )(taskState);

      // assert
      expect(result).toStrictEqual(h("div", "error: 500"));
    });

    it("folds a success TaskState using the onSuccess callback", () => {
      // arrange
      const taskState: ApiTaskState<string> = {
        pending: false,
        result: "some result"
      };

      // act
      const result = toVNodes(
        () => h("div", "initial"),
        () => h("div", "pending"),
        () => h("div", "error"),
        result => h("div", `result: ${result}`)
      )(taskState);

      // assert
      expect(result).toStrictEqual(h("div", "result: some result"));
    });
  });
});
