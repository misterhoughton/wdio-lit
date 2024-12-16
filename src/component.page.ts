// Utilising the Page Object Pattern as described at:
// https://webdriver.io/docs/pageobjects#making-a-page-object
class ComponentPage {
  url = "/";
  get $btnIncrement() {
    return $("#btn_increment");
  }
  get $countMsg() {
    return $("#p_count");
  }
  get $inputText() {
    return $("#input_text");
  }
  get $btnCallEndpoint() {
    return $("#btn_callEndpoint");
  }
  get $apiResultMsg() {
    return $("#p_endpointResult");
  }
  get $apiErrorMsg() {
    return $("#p_errorMsg");
  }
  get $btnEmitEvent() {
    return $("#btn_emitEvent");
  }

  get $btnGetToken() {
    return $("#btn_getToken");
  }

  get $tokenVal() {
    return $("#p_token");
  }

  get $btnLogin() {
    return $("#btn_login");
  }

  get $loginMsg() {
    return $("#p_loginMsg");
  }
}

export default new ComponentPage();
