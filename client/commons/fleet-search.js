import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { ScrollbarStyles } from '@things-factory/styles'
import { localize, i18next } from '@things-factory/i18n-base'
import '@things-factory/grist-ui'

import './fleet-item'

import { searchFleets, setFocusedFleet } from '../actions/fleets'

function scrollIntoViewIfNeeded(container, target) {
  let rect = target.getBoundingClientRect(),
    rectContainer = container.getBoundingClientRect()
  if (rect.bottom > rectContainer.bottom) target.scrollIntoView(false)
  if (rect.top < rectContainer.top) target.scrollIntoView()
}

export class FleetSearch extends connect(store)(localize(i18next)(LitElement)) {
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
          padding: 4px;
          margin: 0;
          list-style-type: none;
        }

        li {
        }

        [active] {
          background-color: #34a6ff;
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

  async updated(changes) {
    if (changes.has('focusedFleetId')) {
      await this.updateComplete

      var container = this.renderRoot.querySelector('ul')
      var element = this.renderRoot.querySelector('li[active]')
      element && scrollIntoViewIfNeeded(container, element)
    }
  }

  render() {
    var { device = '', client = '', delivery = '', fromdate, todate } = this.search || {}
    var fleets = this.fleets || []

    return html`
      <div @change=${this.onchangeSearch.bind(this)} search>
        <label><i18n-msg msgid="field.client"></i18n-msg></label>
        <input name="client" type="text" .value=${client} />

        <label><i18n-msg msgid="field.delivery"></i18n-msg></label>
        <input name="delivery" type="text" .value=${delivery} />

        <label><i18n-msg msgid="field.date"></i18n-msg></label>
        <div wrap>
          <input name="fromdate" type="date" .value=${fromdate} />&nbsp;-&nbsp;<input
            name="todate"
            type="date"
            .value=${todate}
          />
        </div>

        <label><i18n-msg msgid="field.device"></i18n-msg></label>
        <input name="device" type="text" .value=${device} />
      </div>

      <div search-result><i18n-msg msgid="title.total"></i18n-msg> : <strong>${fleets.length}</strong></div>

      <ul style="overflow:scroll;">
        ${fleets.map(
          fleet => html`
            <li @click=${e => setFocusedFleet(fleet.id)} ?active=${this.focusedFleetId == fleet.id}>
              <fleet-item .fleet=${fleet}></fleet-item>
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

customElements.define('fleet-search', FleetSearch)
