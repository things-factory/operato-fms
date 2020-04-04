import { LitElement, html, css } from 'lit-element'
import { navigate } from '@things-factory/shell'
import '@material/mwc-icon'

import '@material/mwc-icon'

export class NotificationItem extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          background-color: white;
          padding: 10px;

          border-left: 0 solid #00ff99;
          transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
          border-radius: 0.5rem;
        }

        :host:hover {
          padding-left: 0.5rem;
          border-left: 0.5rem solid #00ff99;
        }

        [title] {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          white-space: nowrap;
          font-size: 1em;
          font-weight: bold;
        }

        mwc-icon {
          font-size: 1em;
        }

        [message] {
          font-size: 0.8em;
        }

        [timestamp] {
          white-space: nowrap;
          text-align: right;
          font-size: 0.8em;
        }
      `
    ]
  }

  static get properties() {
    return {
      type: String,
      title: String,
      message: String,
      timestamp: Number,
      line: String,
      confirmed: Boolean
    }
  }

  render() {
    return html`
      <div title><mwc-icon>notification_important</mwc-icon>${this.title}</div>
      <div message>${this.message}</div>
      <div timestamp>${new Date(this.timestamp).toLocaleString()}</div>
    `
  }
}

customElements.define('notification-item', NotificationItem)
