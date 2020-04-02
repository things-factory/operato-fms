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

        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          background-color: #ccc;
          border-radius: 50%;
          margin-right: 3px;
          padding: 1px 3px 3px 1px;
          color: #fff;
          font-size: 12px;
          font-weight: normal;
        }

        [battery].good mwc-icon {
          background-color: #539d04;
        }

        [battery].warn mwc-icon {
          background-color: #f48400;
        }

        [battery].bad mwc-icon {
          background-color: #bb4023;
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
          flex: 1.5;
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
    var batteryLevel = !battery ? 'dead' : battery < 20 ? 'bad' : battery < 60 ? 'warn' : 'good'

    return html`
      <div first-line>
        <span name>${name}</span>
        <span battery class=${batteryLevel}><mwc-icon>battery_full</mwc-icon>${battery}%</span>
        <span status ?on=${!!status}>${status ? 'on' : 'off'}</span>
      </div>
      <div second-line>
        <span client title=${client}><mwc-icon>domain</mwc-icon>${client}</span>
        <span delivery title=${delivery}><mwc-icon>local_shipping</mwc-icon>${delivery}</span>
        <span driver title=${driver}><mwc-icon>account_circle</mwc-icon>${driver}</span>
      </div>
    `
  }
}

customElements.define('fleet-item', FleetItem)
