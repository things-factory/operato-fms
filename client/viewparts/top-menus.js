import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'
import { i18next, localize } from '@things-factory/i18n-base'
import { store } from '@things-factory/shell'

export class TopMenus extends connect(store)(localize(i18next)(LitElement)) {
  static get properties() {
    return {
      page: String,
      menus: Array
    }
  }

  static get styles() {
    return [
      css`
        a {
          color: inherit;
          cursor: pointer;
          font-size: 1rem;
          text-decoration: none;
        }

        [active] {
          color: var(--primary-color);
        }
      `
    ]
  }

  connectedCallback() {
    super.connectedCallback()

    this.menus = [
      {
        name: 'Monitoring',
        path: 'fms-monitoring'
      },
      {
        name: 'Report',
        path: 'fms-report'
      },
      {
        name: 'Device',
        path: 'fms-device'
      },
      {
        name: 'Client',
        path: 'fms-client'
      },
      {
        name: 'Geo-fence',
        path: 'fms-geofence'
      },
      {
        name: 'Administrator',
        path: 'fms-admin'
      }
    ]
  }

  render() {
    var page = this.page || ''

    return html`
      ${this.menus.map(
        menu => html`
          <a href=${menu.path} ?active=${!!~page.indexOf(menu.path)}>${menu.name}</a>&nbsp;
        `
      )}
    `
  }

  stateChanged(state) {
    this.page = state.route.page
  }
}

customElements.define('top-menus', TopMenus)
