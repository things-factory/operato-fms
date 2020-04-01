import { LitElement, html, css } from 'lit-element'

export class FleetItem extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          font-size: 14px;
        }

        [first-line] {
          display: flex;
          flex-direction: row;
          position: relative;
        }

        [second-line] {
          display: flex;
          flex-direction: row;
          position: relative;
        }

        [name] {
          flex: 1;
          font-size: 16px;
          color: tomato;
        }

        [battery] {
          flex: none;
          margin-left: auto;
        }

        [status] {
          flex: none;
          margin-left: auto;
          background-color: #c5c8d1;
        }

        [status][on] {
          background-color: #5c9cd5;
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
        <span battery>${battery}</span>
        <span status ?on=${!!status}>${status ? 'online' : 'offline'}</span>
      </div>
      <div second-line>
        <span client>${client}</span>
        <span delivery>${delivery}</span>
        <span driver>${driver}</span>
      </div>
    `
  }
}

customElements.define('fleet-item', FleetItem)
