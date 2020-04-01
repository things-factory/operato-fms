import { LitElement, html, css } from 'lit-element'

export class GeofenceItem extends LitElement {
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

        [type] {
          flex: none;
          margin-left: auto;
        }

        [client] {
          flex: 1;
        }

        [event] {
          flex: none;
          margine-left: auto;
        }
      `
    ]
  }

  static get properties() {
    return {
      geofence: Object
    }
  }

  render() {
    var { name, client, type, event } = this.geofence || {}

    return html`
      <div first-line>
        <span name>${name}</span>
        <span type>${type}</span>
      </div>
      <div second-line>
        <span client>${client}</span>
        <span event>${event}</span>
      </div>
    `
  }
}

customElements.define('geofence-item', GeofenceItem)
