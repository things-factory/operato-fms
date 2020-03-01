import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'

import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import '../../commons/common-search'
import '../../commons/common-map'

class FMSGeoFence extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {
      map: Object,
      polygons: Array,
      polygon: Object,
      coords: Array
    }
  }

  static get styles() {
    return [ScrollbarStyles, FMSPageStyles]
  }

  render() {
    return html`
      <common-search sidebar></common-search>

      <common-map
        main
        .polygons=${this.polygons}
        .boundsCoords=${this.coords}
        @map-change=${e => (this.map = e.detail)}
      >
      </common-map>
    `
  }

  connectedCallback() {
    super.connectedCallback()

    this.coords = [
      [23.832570352277692, 90.41199964550788],
      [23.798165936805923, 90.38352334497074],
      [23.79768310017011, 90.43916111914064]
    ].map(coord => {
      return {
        lat: coord[0],
        lng: coord[1]
      }
    })
  }

  updated(changes) {
    if (changes.has('map') || changes.has('coords')) {
      this.createPolygon()
    }
  }

  getCoordinates() {
    var coordsArr = []

    for (var i = 0; i < this.polygon.getPath().getLength(); i++) {
      coordsArr.push(
        this.polygon
          .getPath()
          .getAt(i)
          .toUrlValue(15)
          .split(',')
      )
    }

    return coordsArr
  }

  coordinatesToLatLng(coordinates) {
    var coords = []

    if (!Array.isArray(coordinates) || coordinates.length < 3) {
      throw new Error('Coordinates size must be greater than 3')
    }

    for (var coordinate in coordinates) {
      coords.push(new google.maps.LatLng(coordinates[coordinate][0], coordinates[coordinate][1]))
    }

    return coords
  }

  createPolygon() {
    if (!this.map) {
      return
    }

    if (this.polygon) {
      this.polygon.setMap(null)
    }

    var polygon = new google.maps.Polygon({
      strokeWeight: 1,
      editable: true,
      draggable: true,
      path: this.coords
    })

    this.polygon = polygon
    this.polygons = [this.polygon]
  }
}

window.customElements.define('fms-geofence', FMSGeoFence)
