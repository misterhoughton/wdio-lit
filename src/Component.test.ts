import { html, render } from "lit";
import ComponentPage from "./component.page.js";

import "./Component.ts";

describe("Lit component testing", () => {
  it("should increment value on click", async () => {
    render(html`<my-element></my-element>`, document.body);

    await ComponentPage.$btnIncrement.click();
    await ComponentPage.$btnIncrement.click();

    await expect(ComponentPage.$countMsg).toHaveText("2");
  });
});
