import ComponentPage from "./component.page.js";

describe("E2E Testing Examples", () => {
  const timeoutConfig = {
    timeout: 5000,
    timeoutMsg: "expected text to be different after 5s",
  };
  const mockAccessToken = "mock-access-token";

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

  describe("Setting and retrieving values from Local Storage", () => {
    it("Can demonstrate that a Local Storage value is not set", async () => {
      await ComponentPage.$btnGetToken.click();
      const tokenVal = await ComponentPage.$tokenVal.getText();
      expect(tokenVal).not.toEqual(mockAccessToken);
    });

    it("Can retrieve a value from Local Storage", async () => {
      await browser.execute((str: string) => {
        window.localStorage.setItem("access_token", str);
      }, mockAccessToken);
      await ComponentPage.$btnGetToken.click();
      const tokenVal = await ComponentPage.$tokenVal.getText();
      expect(tokenVal).toEqual(mockAccessToken);
    });
  });

  describe("Calling an authorisation endpoint with stored credentials", () => {
    let authMock: WebdriverIO.Mock;

    before(async () => {
      await browser.execute(() => {
        window.localStorage.clear();
      });
      authMock = await browser.mock("/api/auth", {
        method: "post",
      });
    });

    it("Can not call the authorisation endpoint if credentials are unavailable", async () => {
      await ComponentPage.$btnLogin.click();
      await expect(authMock).not.toBeRequested();
    });

    it("Can call the authorisation endpoint if credentials are available", async () => {
      const successMsg = "Successful login!";
      await browser.execute((str: string) => {
        window.localStorage.setItem("access_token", str);
      }, mockAccessToken);
      await authMock.respond({ data: "Successful login!" });
      await ComponentPage.$btnLogin.click();
      await ComponentPage.$loginMsg.waitUntil(async function () {
        return (await ComponentPage.$loginMsg.getText()) !== "";
      }, timeoutConfig);
      const loginMsg = await ComponentPage.$loginMsg.getText();
      await expect(loginMsg).toEqual(successMsg);
    });
  });
});
