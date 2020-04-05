import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'
import { store, navigate } from '@things-factory/shell'
import { CONFIRM_NOTIFICATION } from '../actions/notification'

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

          padding: 10px;

          background-color: rgba(58, 71, 104, 0.5);
        }

        :host * {
          margin-bottom: 10px;
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
    var history = this.history.filter(notification => !notification.confirmed)

    return history.length > 0
      ? html`
          ${history.map(
            notification => html`
              <notification-item
                @click=${e => {
                  store.dispatch({
                    type: CONFIRM_NOTIFICATION,
                    id: notification.id
                  })
                  navigate(notification.link)
                }}
                .title=${notification.title}
                .type=${notification.type}
                .message=${notification.message}
                .timestamp=${notification.timestamp}
                .link=${notification.link}
                .confirmed=${notification.confirmed}
              ></notification-item>
            `
          )}
        `
      : html`
          <span>Nothing to show</span>
        `
  }

  stateChanged(state) {
    this.history = state.notification.history
  }
}

customElements.define('notification-list', NotificationList)
