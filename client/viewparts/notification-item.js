import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

export class NotificationItem extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          background-color: white;
          padding: 5px 10px;

          border-left: 0 solid #fff;
          transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
          border-radius: 0.5rem;
          color: var(--scondary-color);
        }

        :host(:hover) {
          padding-left: 0.5rem;
          border-left: 0.5rem solid #fff;
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
          color: black;
        }

        :host([type='SEVERE']) [title],
        :host([type='SEVERE']) mwc-icon {
          color: var(--status-danger-color);
        }
        :host([type='SEVERE']) {
          border-color: var(--status-danger-color);
        }

        :host([type='WARN']) [title],
        :host([type='WARN']) mwc-icon {
          color: var(--status-warning-color);
        }
        :host([type='WARN']) {
          border-color: var(--status-warning-color);
        }

        :host([type='SUCCESS']) [title],
        :host([type='SUCCESS']) mwc-icon {
          color: var(--status-success-color);
        }
        :host([type='SUCCESS']) {
          border-color: var(--status-success-color);
        }

        :host([type='INFO']) [title],
        :host([type='INFO']) mwc-icon {
          color: var(--status-info-color);
        }
        :host([type='INFO']) {
          border-color: var(--status-info-color);
        }

        [message] {
          font-size: 0.8em;
          line-height: 1.3;
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
      type: {
        type: String,
        reflect: true
      },
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
