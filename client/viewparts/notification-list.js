import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'
import { store, navigate } from '@things-factory/shell'

import '@material/mwc-icon'
import './notification-item'

export class NotificationList extends connect(store)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;

          height: 100%;
          overflow: auto;

          background-color: rgba(0, 0, 0, 0.2);
        }

        :host * {
          margin: 10px;
        }
      `
    ]
  }

  static get properties() {
    return {
      history: Array
    }
  }

  render() {
    var history = this.history

    return html`
      ${history.map(
        notification => html`
          <notification-item
            @click=${e => {
              navigate(notification.link)
            }}
            .title=${notification.title}
            .message=${notification.message}
            .timestamp=${notification.timestamp}
            .link=${notification.link}
            .confirmed=${notification.confirmed}
          ></notification-item>
        `
      )}
    `
  }

  stateChanged(state) {
    this.history = state.notification.history
  }
}

customElements.define('notification-list', NotificationList)
