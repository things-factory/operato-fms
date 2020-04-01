import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers'

import '@material/mwc-icon'

import { store } from '@things-factory/shell'

import {
  ICONS_MONITORING,
  ICONS_REPORT,
  ICONS_DEVICE,
  ICONS_DRIVER,
  ICONS_GEOFENCE,
  ICONS_ADMINISTRATOR
} from '../icons/menu-icons'

export class MenuTools extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: String,
      width: {
        type: String,
        reflect: true
      },
      context: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--menu-tools-background-color);

          /* for narrow mode */
          flex-direction: column;
          width: 100%;
        }

        :host([width='WIDE']) {
          /* for wide mode */
          flex-direction: row;
          width: initial;
          height: 100%;
        }

        ul {
          display: flex;
          flex-direction: row;

          margin: auto;
          padding: 0;
          list-style: none;
          height: 100%;
          overflow: none;
        }

        :host([width='NARROW']) ul {
          width: 100%;
          justify-content: space-around;
        }

        :host([width='WIDE']) ul {
          flex-direction: column;
        }

        :host([width='WIDE']) li {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        a {
          display: flex;
          flex-direction: column;
          padding: 5px 0px;
          align-items: center;
          text-align: center;
          text-decoration: none;
          color: var(--menu-tools-color);
        }

        a[active] {
          color: var(--menu-tools-active-color);
          background-color: rgba(0, 0, 0, 0.2);
        }

        img {
          display: block;
          width: 40px;
          padding: 5px 5px 0px 5px;
          vertical-align: bottom;
        }

        :host([width='NARROW']) img {
          width: 20px;
        }

        div {
          font-size: 0.6em;
        }
      `
    ]
  }

  render() {
    this.menus = [
      {
        name: 'monitoring',
        path: 'fms-monitoring',
        icons: ICONS_MONITORING
      },
      {
        name: 'report',
        path: 'fms-report',
        icons: ICONS_REPORT
      },
      {
        name: 'device',
        path: 'fms-device',
        icons: ICONS_DEVICE
      },
      {
        name: 'client',
        path: 'fms-client',
        icons: ICONS_DRIVER
      },
      {
        name: 'geo-fence',
        path: 'fms-geofence',
        icons: ICONS_GEOFENCE
      },
      {
        name: 'admin',
        path: 'fms-admin',
        icons: ICONS_ADMINISTRATOR
      }
    ]

    var page = this.page || ''

    return html`
      <ul>
        ${this.menus.map(
          menu => html`
            <li>
              <a href=${menu.path} ?active=${!!~page.indexOf(menu.path)}>
                <img src=${!!~page.indexOf(menu.path) ? menu.icons[1] : menu.icons[0]} />
                <div>${menu.name}</div>
              </a>
            </li>
          `
        )}
      </ul>
    `
  }

  stateChanged(state) {
    this.page = state.route.page
    this.width = state.layout.width
    this.context = state.route.context
  }
}

window.customElements.define('menu-tools', MenuTools)
