import { css, html, LitElement } from 'lit-element'
import './common-map'

class TrackPopup extends LitElement {
  static get properties() {
    return {}
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;

          background-color: gray;
        }

        common-map {
          flex: 1;
        }
      `
    ]
  }

  render() {
    return html`
      <common-map main @map-change=${e => (this.map = e.detail)}> </common-map>
    `
  }

  updated(changes) {
    if (changes.has('map')) {
    }
  }
}

window.customElements.define('track-popup', TrackPopup)
