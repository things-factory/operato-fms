import { LitElement, html, css } from 'lit-element'

export class TopMenus extends LitElement {
  static get properties() {
    return {}
  }

  static get styles() {
    return [
      css`
        a {
          color: inherit;
          cursor: pointer;
          font-size: 1em;
          text-decoration: none;
        }
      `
    ]
  }

  render() {
    var menus = [
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
        path: 'administrator'
      }
    ]

    return html`
      ${menus.map(
        menu => html`
          <a href=${menu.path}>${menu.name}</a>&nbsp;
        `
      )}
    `
  }
}

customElements.define('top-menus', TopMenus)
