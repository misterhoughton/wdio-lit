import ComponentPage from "./component.page.js";

describe("E2E Testing Examples", () => {
  before(async () => {
    await browser.url(ComponentPage.url);
  });

  it("should click a button element", async () => {
    await ComponentPage.$btnIncrement.click();
    const count = await ComponentPage.$countMsg.getText();
    await expect(count).toEqual("1");
  });

  it("should input some text", async () => {
    const val = "some text here";
    await ComponentPage.$inputText.setValue(val);
    const inputVal = await ComponentPage.$inputText.getValue();
    await expect(inputVal).toEqual(val);
  });

  it("should clear an input", async () => {
    await ComponentPage.$inputText.setValue("some value");
    await ComponentPage.$inputText.clearValue();
    const inputVal = await ComponentPage.$inputText.getValue();
    await expect(inputVal).toEqual("");
  });

  it("should reload the page", async () => {
    await ComponentPage.$btnIncrement.click();
    await ComponentPage.$inputText.setValue("some other value");
    await browser.refresh();
    const count = await ComponentPage.$countMsg.getText();
    await expect(count).toEqual("0");
  });

  describe("Calling an API", () => {
    const timeoutConfig = {
      timeout: 5000,
      timeoutMsg: "expected text to be different after 5s",
    };
    let mock: WebdriverIO.Mock;

    beforeEach(async () => {
      mock = await browser.mock("/api/get-data", {
        method: "get",
      });
    });

    it("should call an endpoint", async () => {
      const mockResponse = { data: "My mock response" };
      mock.respond(mockResponse);

      await ComponentPage.$btnCallEndpoint.click();
      await ComponentPage.$apiResultMsg.waitUntil(async function () {
        return (await ComponentPage.$apiResultMsg.getText()) !== "";
      }, timeoutConfig);
      const resultTxt = await ComponentPage.$apiResultMsg.getText();
      await expect(resultTxt).toEqual(mockResponse.data);
    });

    it("should report endpoint errors", async () => {
      mock.abort("Failed");
      await ComponentPage.$btnCallEndpoint.click();
      await ComponentPage.$apiErrorMsg.waitUntil(async function () {
        return (await ComponentPage.$apiErrorMsg.getText()) !== "";
      }, timeoutConfig);
      const errorTxt = await ComponentPage.$apiErrorMsg.getText();
      await expect(errorTxt).toEqual("TypeError: Failed to fetch");
    });
  });
});
