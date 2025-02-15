import { render } from "lit";
import ComponentPage from "./component.page";
import { MyElement } from "./Component";

describe("Lit component testing using new element instance in each spec", () => {
  beforeEach(() => {
    render(new MyElement(), document.body);
  });

  it("should increment value on click", async () => {
    await ComponentPage.$btnIncrement.click();
    await ComponentPage.$btnIncrement.click();
    await expect(ComponentPage.$countMsg).toHaveText("2");
  });

  it("should set an input value", async () => {
    await ComponentPage.$inputText.setValue("hello");
    await expect(ComponentPage.$inputText).toHaveValue("hello");
  });

  it("should reset values", async () => {
    await expect(ComponentPage.$inputText).toHaveValue("");
    await expect(ComponentPage.$countMsg).toHaveText("0");
  });
});
