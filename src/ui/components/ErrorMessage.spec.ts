import { mount } from "@vue/test-utils";
import { ErrorMessage } from "./ErrorMessage";
import { ApiError } from "@/services/breweryDB";

jest.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: (t: string) => t,
    d: (d: Date) => d.toString(),
    n: (n: number) => n
  })
}));

describe("UI / Components / ErrorMessage", () => {
  it("displays error message based on status code", async () => {
    // act
    const wrapper = mount(ErrorMessage, {
      props: {
        error: new ApiError(500)
      }
    });
    const wrapper2 = mount(ErrorMessage, {
      props: {
        error: new ApiError(10)
      }
    });

    // assert
    expect(wrapper.find("p").text()).toContain("Server error");
    expect(wrapper2.find("p").text()).toContain("Network error");
  });

  it("emits retry event on button click", async () => {
    // arrange
    const wrapper = mount(ErrorMessage, {
      props: {
        error: new ApiError(500)
      }
    });
    const button = wrapper.find("button");

    // act
    await button.trigger("click");

    // assert
    expect(wrapper.emitted("retry")).toBeTruthy();
  });
});
