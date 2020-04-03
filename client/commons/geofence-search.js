import { LitElement, html, css } from 'lit-element'
import { ScrollbarStyles } from '@things-factory/styles'
import { i18next } from '@things-factory/i18n-base'
import Chance from 'chance'

import { fetchGeofence } from './fetch-geofence'
import './geofence-item'

export class GeofenceSearch extends LitElement {
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: var(--main-section-background-color);
          box-shadow: inset 2px 0px 3px 0px rgba(0, 0, 0, 0.15);
          border-right: 1px solid rgba(0, 0, 0, 0.2);
        }

        [search-result] {
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-width: 1px 0;
          padding: 3px 0 3px 7px;
          font: normal 13px var(--theme-font);
          color: var(--secondary-text-color);
        }

        ul {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }

        li {
          background-color: #fff;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 10px 7px 7px 10px;
        }

        [active] {
          background-color: var(--primary-color);
        }
        [active] * {
          color: #fff !important;
        }
      `
    ]
  }

  static get properties() {
    return {
      focusedGeofenceId: String,
      geofences: Array,
      total: Number
    }
  }

  async firstUpdated() {
    await this.updateComplete
    this.fetchGeofences()
  }

  render() {
    var geofences = this.geofences || []
    var total = this.total || 0

    return html`
      <div search-result><i18n-msg msgid="title.total"></i18n-msg> : <strong>${total}</strong></div>

      <ul style="overflow:auto;">
        ${geofences.map(
          geofence => html`
            <li @click=${e => this.setFocusedGeofence(geofence.id)} ?active=${this.focusedGeofenceId == geofence.id}>
              <geofence-item .geofence=${geofence}></geofence-item>
            </li>
          `
        )}
      </ul>
    `
  }

  async setFocusedGeofence(geofenceId) {
    var geofence = await fetchGeofence(geofenceId)
    this.focusedGeofenceId = geofenceId

    this.dispatchEvent(
      new CustomEvent('geofence', {
        detail: geofence
      })
    )
  }

  async fetchGeofences() {
    var chance = new Chance()

    this.total = 10
    this.geofences = Array(10)
      .fill()
      .map((_, idx) => {
        var num = ~~(Math.random() * 100)
        return {
          id: idx,
          client: 'ebay',
          name: chance.address(),
          type: ['Inbound', 'Outbound'][~~(Math.random() * 2)],
          event: ~~(Math.random() * 5)
        }
      })
  }
}

customElements.define('geofence-search', GeofenceSearch)
