import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;
  @property({ type: String })
  result = "";
  @property({ type: String })
  error = "";

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
      <button id="btn_emitEvent" @click=${this._emitEvent}>
        Call Endpoint
      </button>`;
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
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
