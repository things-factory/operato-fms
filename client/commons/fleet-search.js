import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { ScrollbarStyles } from '@things-factory/styles'
import { localize, i18next } from '@things-factory/i18n-base'
import '@things-factory/grist-ui'

import './fleet-item'

import { setFocusedFleet } from '../actions/fleets'

function scrollIntoViewIfNeeded(container, target) {
  let rect = target.getBoundingClientRect(),
    rectContainer = container.getBoundingClientRect()
  if (rect.bottom > rectContainer.bottom) {
    target.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }
  if (rect.top < rectContainer.top) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }
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
          flex: 1;
          margin: 0;
          padding: 0;
          list-style-type: none;
          overflow: scroll;
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
      fleets: Object,
      focusedFleetId: String
    }
  }

  stateChanged(state) {
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
    var fleets = this.fleets || []

    return html`
      <div search-result><i18n-msg msgid="title.total"></i18n-msg> : <strong>${fleets.length}</strong></div>

      <ul>
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
}

customElements.define('fleet-search', FleetSearch)
