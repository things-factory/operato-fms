import { LitElement, html, css } from 'lit-element'
import '@material/mwc-radio'
import '@material/mwc-formfield'

export const MODE_FLEET = 0
export const MODE_TRACK = 1

class MapMode extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          margin: 10px;
        }

        span {
          background-color: white;
          padding: 0;
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
      <mwc-formfield label="Fleet">
        <mwc-radio @click=${e => this.setMode(MODE_FLEET)} name="fleet" ?checked=${mode == MODE_FLEET}></mwc-radio>
      </mwc-formfield>

      <mwc-formfield label="Track">
        <mwc-radio @click=${e => this.setMode(MODE_TRACK)} name="track" ?checked=${mode == MODE_TRACK}></mwc-radio>
      </mwc-formfield>
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
