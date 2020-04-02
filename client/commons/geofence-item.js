import { LitElement, html, css } from 'lit-element'

export class GeofenceItem extends LitElement {
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

        [type] {
          flex: none;
          margin: 3px 0 0 5px;
          background-color: #539d04; /* inbound : #539d04, oubbound : #045a9d */
          border-radius: var(--border-radius);
          width: 65px;
          height: 14px;

          text-align: center;
          color: #fff;
          font-size: 10px;
          text-transform: uppercase;
          font-weight: bold;
        }

        [client] {
          flex: 1;
        }

        [event] {
          flex: none;
          margin-left: auto;
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
        <span client><mwc-icon>domain</mwc-icon>${client}</span>
        <span event><mwc-icon>notification_important</mwc-icon>${event}</span>
      </div>
    `
  }
}

customElements.define('geofence-item', GeofenceItem)
