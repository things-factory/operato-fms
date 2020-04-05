import { LitElement, html, css } from 'lit-element'

export const MODE_FLEET = 0
export const MODE_TRACK = 1

class MapMode extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          border: 10px solid red;
          margin: 10px;
        }

        span {
          background-color: white;
          padding: 5px 10px;
        }

        [active] {
          background-color: tomato;
        }
      `
    ]
  }

  static get properties() {
    return {
      mode: String
    }
  }

  render() {
    var mode = this.mode || MODE_FLEET
    return html`
      <span @click=${e => this.setMode(MODE_FLEET)} ?active=${mode == MODE_FLEET}>fleet</span>
      <span @click=${e => this.setMode(MODE_TRACK)} ?active=${mode == MODE_TRACK}>track</span>
    `
  }

  setMode(mode) {
    this.mode = mode

    this.dispatchEvent(
      new CustomEvent('change-mode', {
        detail: mode
      })
    )
  }
}

customElements.define('map-mode', MapMode)
