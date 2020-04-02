import { LitElement, html, css } from 'lit-element'

export class FleetItem extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          font-size: 12px;
          color: var(--secondary-color);
        }

        [first-line] {
          display: flex;
          flex-direction: row;
          position: relative;
        }
        [first-line] * {
          vertical-align: middle;
        }

        [second-line] {
          display: flex;
          flex-direction: row;
          position: relative;
        }
        [second-line] * {
          vertical-align: middle;
          opacity: 0.8;
        }
        [second-line] mwc-icon {
          margin-right: 2px;
          font-size: 13px;
        }

        [name] {
          flex: 1;
          font-size: 15px;
          font-weight: bold;
        }

        [battery] {
          flex: none;
          width: 50px;
          margin-left: auto;
          font-weight: bold;
          text-align: right;
        }
        [battery] mwc-icon {
          width: 10px;
          height: 10px;
          background-color: #539d04; /* green : #539d04, red : #bb4023, orange : #f48400 */
          border-radius: 50%;
          margin-right: 3px;
          padding: 1px 3px 3px 1px;
          color: #fff;
          font-size: 12px;
          font-weight: normal;
        }

        [status] {
          flex: none;
          margin-left: 5px;
          background-color: #737679;
          border-radius: var(--border-radius);
          width: 28px;
          height: 14px;

          text-align: center;
          color: #fff;
          font-size: 10px;
          text-transform: uppercase;
          font-weight: bold;
        }

        [status][on] {
          background-color: #539d04;
        }

        [client] {
          flex: 1;
        }

        [delivery] {
          flex: 1;
        }

        [driver] {
          flex: 1;
        }
      `
    ]
  }

  static get properties() {
    return {
      fleet: Object
    }
  }

  render() {
    var { name, battery, status, client, delivery, driver } = this.fleet || {}

    return html`
      <div first-line>
        <span name>${name}</span>
        <span battery><mwc-icon>battery_full</mwc-icon>${battery}%</span>
        <span status ?on=${!!status}>${status ? 'on' : 'off'}</span>
      </div>
      <div second-line>
        <span client><mwc-icon>domain</mwc-icon>${client}</span>
        <span delivery><mwc-icon>local_shipping</mwc-icon>${delivery}</span>
        <span driver><mwc-icon>account_circle</mwc-icon>${driver}</span>
      </div>
    `
  }
}

customElements.define('fleet-item', FleetItem)
