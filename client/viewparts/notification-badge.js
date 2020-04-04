import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'

export class NotificationBadge extends connect(store)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          font-size: 2em;
          margin: 0 5px 0 0;
        }

        mwc-icon {
          display: block;
        }

        [data-badge] {
          position: relative;
        }

        [data-badge]::after {
          content: attr(data-badge);
          position: absolute;
          bottom: -6px;
          right: -6px;
          font-family: roboto;
          font-size: 0.5em;
          background: red;
          color: white;
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          border-radius: 50%;
          box-shadow: 0 0 1px #333;
        }

        [data-badge='0']::after {
          display: none;
        }
      `
    ]
  }

  static get properties() {
    return {
      badge: Number
    }
  }

  render() {
    var badge = this.badge || 0
    return html`
      <mwc-icon data-badge=${badge} class="badge">notification_important</mwc-icon>
    `
  }

  stateChanged(state) {
    this.badge = state.notification.badge
  }
}

customElements.define('notification-badge', NotificationBadge)
