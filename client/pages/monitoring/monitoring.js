import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

import '../../commons/common-search'
import '../../commons/common-map'

class FMSMonitoring extends connect(store)(PageView) {
  static get properties() {
    return {
      map: Object
    }
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
    return html`
      <common-search sidebar></common-search>

      <common-map main @map-change=${e => (this.map = e.detail)}> </common-map>
    `
  }

  updated(changes) {
    if (changes.has('map')) {
    }
  }

  stateChanged(state) {}
}

window.customElements.define('fms-monitoring', FMSMonitoring)
