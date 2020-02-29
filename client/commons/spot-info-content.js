import { LitElement, html, css } from 'lit-element'

export class SpotInfoContent extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          position: relative;
        }

        image-slider {
          margin: 5px;
          width: 300px;
          height: 200px;
        }

        [rate] {
          position: absolute;
          display: flex;
          align-items: center;
          font-size: 0.8em;
          top: 10px;
          right: 0;
        }

        [info] {
          flex: 1;
        }

        [note] {
          font-size: 1em;
          font-weight: bold;
        }

        [brief] {
          font-size: 1.3em;
        }

        [desc] {
          font-size: 1em;
        }

        mwc-icon {
          font-size: 1em;
          color: red;
        }
      `
    ]
  }

  static get properties() {
    return {
      name: String,
      position: Object /* {lat, lng} */
    }
  }

  render() {
    return html`
      <div info>
        <div note>[super partner] cold storage</div>
        <h2 brief>${this.name}</h2>
        <div desc>Blah Blah Blah Blah Blah Blah</div>
        <div desc>Blah Blah Blah Blah Blah Blah</div>
      </div>
      <div rate>
        <mwc-icon>star</mwc-icon>
        <span>4.70(203)</span>
      </div>
    `
  }
}

customElements.define('spot-info-content', SpotInfoContent)
