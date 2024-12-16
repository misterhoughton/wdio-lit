import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;
  @property()
  result = "";
  @property()
  error = "";
  @property()
  token = "";
  @property()
  loginMsg = "";

  render() {
    return html`<button id="btn_increment" @click=${this.incrementCount}>
        Increment value
      </button>
      <input id="input_text" type="text" />
      <p id="p_count">${this.count}</p>
      <button id="btn_callEndpoint" @click=${this._callEndpoint}>
        Call Endpoint
      </button>
      <p id="p_endpointResult">${this.result}</p>
      <p id="p_errorMsg">${this.error}</p>
      <button id="btn_emitEvent" @click=${this._emitEvent}>Emit Event</button>
      <button id="btn_getToken" @click=${this._getToken}>Get Token</button>
      <p id="p_token">${this.token || "No token set"}</p>
      <button id="btn_login" @click=${this._login}>Login</button>
      <p id="p_loginMsg">${this.loginMsg}</p>`;
  }

  incrementCount() {
    this.count++;
  }

  private _callEndpoint() {
    window
      .fetch("/api/get-data")
      .then((res) => res.json())
      .then((res) => (this.result = res.data))
      .catch((err) => (this.error = err));
  }

  private _emitEvent(e: Event) {
    this.dispatchEvent(
      new CustomEvent("my-event", {
        detail: e,
      })
    );
  }

  private _getToken() {
    this.token = localStorage.getItem("access_token");
  }

  private _login() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      window
        .fetch("/api/auth", {
          method: "POST",
          body: JSON.stringify({ access_token }),
        })
        .then((res) => res.json())
        .then((res) => (this.loginMsg = res.data))
        .catch((err) => (this.loginMsg = err));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
