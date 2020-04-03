import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-button'
import '@material/mwc-textfield'
import { store, PageView } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'

import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import '../../commons/geofence-search'
import '../../commons/common-map'

class FMSGeoFence extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {
      map: Object,
      polygons: Array,
      coords: Array
    }
  }

  static get styles() {
    return [ScrollbarStyles, FMSPageStyles]
  }

  get context() {
    return {
      title: i18next.t('title.geofence'),
      exportable: {
        accept: ['json'],
        name: 'device',
        data: () => {
          return []
        }
      },
      actions: [
        {
          title: i18next.t('button.register'),
          action: this.register.bind(this)
        }
      ]
    }
  }

  render() {
    return html`
      <form search>
        <mwc-textfield label="client" icon="domain"></mwc-textfield>
        <mwc-textfield label="geofence" icon="tab_unselected"></mwc-textfield>
        <mwc-textfield label="type" icon="sync_alt"></mwc-textfield>
        <mwc-button label="search" icon="search" raised></mwc-button>
      </form>

      <div main>
        <geofence-search sidebar @geofence=${e => (this.coords = e.detail)}></geofence-search>

        <common-map .polygons=${this.polygons} .boundCoords=${this.coords} @map-change=${e => (this.map = e.detail)}>
        </common-map>
      </div>
    `
  }

  updated(changes) {
    if (changes.has('map') || changes.has('coords')) {
      this.createPolygon()
    }
  }

  createPolygon() {
    if (!this.map) {
      return
    }

    if (this.polygons) {
      this.polygons.forEach(polygon => polygon.setMap(null))
    }

    if (this.coords) {
      if (this.coords.length < 3) {
        this.polygons = []
        throw new Error('Coordinates size must be greater than 3')
      }

      this.polygons = [
        new google.maps.Polygon({
          strokeWeight: 1,
          editable: true,
          draggable: true,
          path: this.coords
        })
      ]
    } else {
      this.polygons = []
    }
  }

  register() {}
}

window.customElements.define('fms-geofence', FMSGeoFence)
