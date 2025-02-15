// Utilising the Page Object Pattern as described at:
// https://webdriver.io/docs/pageobjects#making-a-page-object
class ComponentPage {
  url = "/";

  get $body() {
    return $("body");
  }

  get $btnIncrement() {
    return $("#btn_increment");
  }
  get $countMsg() {
    return this.$body.$('p[data-testid="msg_count"]');
  }
  get $inputText() {
    return this.$body.$("#input_text");
  }
  get $btnCallEndpoint() {
    return this.$body.$("#btn_callEndpoint");
  }
  get $apiResultMsg() {
    return this.$body.$("#p_endpointResult");
  }
  get $apiErrorMsg() {
    return this.$body.$("#p_errorMsg");
  }
  get $btnEmitEvent() {
    return this.$body.$("#btn_emitEvent");
  }

  get $btnGetToken() {
    return this.$body.$("#btn_getToken");
  }

  get $tokenVal() {
    return this.$body.$("#p_token");
  }

  get $btnLogin() {
    return this.$body.$("#btn_login");
  }

  get $loginMsg() {
    return this.$body.$("#p_loginMsg");
  }
}

export default new ComponentPage();
