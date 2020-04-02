import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
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
      title: i18next.t('title.geofence')
    }
  }

  render() {
    return html`
      <geofence-search sidebar @geofence=${e => (this.coords = e.detail)}></geofence-search>

      <common-map main .polygons=${this.polygons} .boundCoords=${this.coords} @map-change=${e => (this.map = e.detail)}>
      </common-map>
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
}

window.customElements.define('fms-geofence', FMSGeoFence)
