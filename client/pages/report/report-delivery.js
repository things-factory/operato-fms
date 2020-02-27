import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

import '../../commons/common-search'
import '../../commons/common-map'

class ReportDelivery extends connect(store)(PageView) {
  static get properties() {
    return {}
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
      }

      [sidebar] {
        width: 300px;

        display: flex;
        flex-direction: column;
      }

      [main] {
        flex: 1;
      }
    `
  }

  render() {
    var warehouses = []
    var focused = {}

    return html`
      <common-search sidebar></common-search>

      <common-map
        main
        .locations=${warehouses}
        .focused=${focused}
        @map-change=${e =>
          store.dispatch({
            type: 'UPDATE_SEARCH_MAP',
            map: e.detail
          })}
      >
      </common-map>
    `
  }

  stateChanged(state) {}
}

window.customElements.define('report-delivery', ReportDelivery)
