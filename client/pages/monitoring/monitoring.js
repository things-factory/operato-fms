import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'

import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import { MapBuilder } from '../../commons/map-builder'

import '../../commons/common-search'
import '../../commons/common-map'
import '../../commons/spot-info-content'

class FMSMonitoring extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {
      _polylines: Array,
      _markers: Array,
      _boundCoords: Array,
      fleets: Array,
      tracks: Array,
      map: Object
    }
  }

  static get styles() {
    return [ScrollbarStyles, FMSPageStyles]
  }

  render() {
    return html`
      <common-search sidebar @tracks=${e => (this.tracks = e.detail)}></common-search>

      <common-map
        main
        .polylines=${this._polylines}
        .markers=${this._markers}
        .boundCoords=${this._boundCoords}
        @map-change=${e => (this.map = e.detail)}
      >
      </common-map>
    `
  }

  updated(changes) {
    if (changes.has('map') || changes.has('tracks') || changes.has('fleets')) {
      this.map && this.createTrack()
    }
  }

  createTrack() {
    var fleets = (this.fleets || []).map(fleet => {
      var { name, latlng, parameters } = fleet
      var [lat, lng] = latlng.split(',').map(parseFloat)
      var position = { lat, lng }

      return {
        position: { lat, lng },
        get content() {
          var content = document.createElement('spot-info-content')
          content.data = {
            name,
            position,
            parameters
          }

          return content
        }
      }
    })

    var tracks = (this.tracks || []).map(track => {
      var { name, lat, lng, parameters } = track
      var position = { lat, lng }

      return {
        position: { lat, lng },
        get content() {
          var content = document.createElement('spot-info-content')
          content.data = {
            name,
            position,
            parameters
          }

          return content
        }
      }
    })

    var { polylines, markers, boundCoords } = MapBuilder.createMapComponents(fleets, tracks)

    markers.forEach(marker => {
      google.maps.event.addListener(marker, 'click', e => {
        if (marker.content) {
          this.infoWindow.open(this.map, marker)
          this.infoWindow.setContent(marker.content)
        }
      })
    })

    this._polylines = polylines
    this._markers = markers
    this._boundCoords = boundCoords
  }

  stateChanged(state) {
    this.fleets = state.fleets.fleets
  }

  get infoWindow() {
    if (!this._infoWindow) {
      this._infoWindow = new google.maps.InfoWindow({
        content: 'loading...'
      })
    }

    return this._infoWindow
  }
}

window.customElements.define('fms-monitoring', FMSMonitoring)
