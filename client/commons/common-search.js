import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { ScrollbarStyles } from '@things-factory/styles'
import { localize, i18next } from '@things-factory/i18n-base'
import '@things-factory/grist-ui'

import { searchFleets, setFocusedFleet } from '../actions/fleets'

export class CommonSearch extends connect(store)(localize(i18next)(LitElement)) {
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

        [wrap] {
          display: flex;
          align-items: stretch;
          border: 0;
        }

        [wrap] input {
          flex: 1;
          margin: 0;
          min-width: 0;
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
          flex: 1;
        }

        [active] {
          background-color: red;
        }
      `
    ]
  }

  static get properties() {
    return {
      search: Object,
      fleets: Object,
      focusedFleetId: String
    }
  }

  stateChanged(state) {
    this.search = state.fleets.search
    this.fleets = state.fleets.fleets
    this.focusedFleetId = state.fleets.focusedFleetId
  }

  updated(changes) {
    if (changes.has('focusedFleetId')) {
      // TODO focused 레코드를 자동으로 변경한다. Map과 데이타를 동기화 하기위함임.
    }
  }

  render() {
    var { device = '', client = '', delivery = '', fromdate, todate } = this.search || {}
    var fleets = this.fleets || []

    return html`
      <div @change=${this.onchangeSearch.bind(this)} search>
        <label>client</label>
        <input name="client" type="text" .value=${client} />

        <label>delivery</label>
        <input name="delivery" type="text" .value=${delivery} />

        <label>date</label>
        <div wrap>
          <input name="fromdate" type="date" .value=${fromdate} />&nbsp;-&nbsp;<input
            name="todate"
            type="date"
            .value=${todate}
          />
        </div>

        <label>device</label>
        <input name="device" type="text" .value=${device} />
      </div>

      <div search-result>total : <strong>${fleets.length}</strong></div>

      <ul style="overflow:scroll;">
        ${fleets.map(
          data => html`
            <li @click=${e => setFocusedFleet(data.id)} ?active=${this.focusedFleetId == data.id}>
              <span name>${data.name}</span>
              <span battery>${data.battery}</span>
              <span onoff>${data.status ? 'online' : 'offline'}</span>
              <span client>${data.client}</span>
              <span delivery>${data.delivery}</span>
              <span drever>${data.drever}</span>
            </li>
          `
        )}
      </ul>
    `
  }

  onchangeSearch(e) {
    var target = e.target

    searchFleets({
      ...this.search,
      [target.name]: target.value
    })
  }
}

customElements.define('common-search', CommonSearch)
