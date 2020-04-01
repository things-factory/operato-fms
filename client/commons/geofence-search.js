import { LitElement, html, css } from 'lit-element'
import { ScrollbarStyles } from '@things-factory/styles'
import { i18next } from '@things-factory/i18n-base'

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
        }

        [search] {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-gap: 5px;

          padding: 4px 6px;
          align-items: center;
        }

        [search] > * {
          box-sizing: border-box;
          margin: 0;

          color: var(--secondary-text-color);
          font: normal 13px var(--theme-font);
        }

        [search] label {
          grid-column: span 3;
          text-transform: capitalize;
          font-weight: bold;
          text-align: right;
          align-self: center;
        }

        [search] > input,
        [search] > select,
        [wrap] {
          grid-column: span 7;
          border: 1px solid rgba(0, 0, 0, 0.2);
          align-self: stretch;
        }

        [search] label {
          grid-column: span 3;
          text-transform: capitalize;
          font-weight: bold;
          text-align: right;
          align-self: center;
        }

        [search] > input,
        [search] > select {
          grid-column: span 7;
          border: 1px solid rgba(0, 0, 0, 0.2);
          align-self: stretch;
        }

        input {
          border: 1px solid rgba(0, 0, 0, 0.2);
          background-color: transparent;
        }

        [search-result] {
          padding: 3px 0 5px 3px;
          font: normal 13px var(--theme-font);
          color: var(--secondary-text-color);
        }

        ul {
          padding: 4px;
          margin: 0;
          list-style-type: none;
        }

        li {
        }

        [active] {
          background-color: #ddd;
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
      <div search>
        <label>client</label>
        <select></select>

        <label>geofence</label>
        <select></select>

        <label>type</label>
        <select></select>
      </div>

      <div search-result>total : <strong>${total}</strong></div>

      <ul style="overflow:scroll;">
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
    this.total = 10
    this.geofences = Array(10)
      .fill()
      .map((_, idx) => {
        var num = ~~(Math.random() * 100)
        return {
          id: idx,
          client: 'Client-' + num,
          name: 'Geofence-' + num,
          type: ['Inbound', 'Outbound'][~~(Math.random() * 2)],
          event: ~~(Math.random() * 5)
        }
      })
  }
}

customElements.define('geofence-search', GeofenceSearch)
