import { html, render } from "lit";
import { fn, spyOn } from "@wdio/browser-runner";
import ComponentPage from "./component.page.js";
import { MyElement } from "./Component.js";
import "./Component.ts";

describe("Lit component testing", () => {
  const classSpy = spyOn(MyElement.prototype, "incrementCount");
  const eventSpy = fn();

  before(() => {
    render(
      html`<my-element @my-event=${eventSpy}></my-element>`,
      document.body
    );
  });

  it("should increment value on click", async () => {
    await ComponentPage.$btnIncrement.click();
    await ComponentPage.$btnIncrement.click();
    await expect(ComponentPage.$countMsg).toHaveText("2");
  });

  it("should spy on an class function", async () => {
    classSpy.mockReset();
    await ComponentPage.$btnIncrement.click();
    await ComponentPage.$btnIncrement.click();
    await expect(classSpy).toHaveBeenCalledTimes(2);
  });

  it("should emit an event", async () => {
    await ComponentPage.$btnEmitEvent.click();
    await ComponentPage.$btnEmitEvent.click();
    await expect(eventSpy).toHaveBeenCalledTimes(2);
  });
});
