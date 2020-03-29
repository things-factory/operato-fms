import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'

import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import { MapBuilder } from '../../commons/map-builder'
import { setFocusedFleet } from '../../actions/fleets'

import '../../commons/common-search'
import '../../commons/common-map'
import '../../commons/marker-info-content'

import { FLEET_ICONS } from '../../icons/fleet-marker-icons'

const SCALED_SIZE = { width: 24, height: 24 }
const FOCUSED_SIZE = { width: 32, height: 32 }

const NORMAL = 0
const WARN = 1
const SEVERE = 2
const FOCUS = 3
const DISCONNECTED = 4

const NORMAL_ICON = {
  url: FLEET_ICONS[NORMAL],
  scaledSize: SCALED_SIZE
}

const FOCUSED_ICON = {
  url: FLEET_ICONS[FOCUS],
  scaledSize: FOCUSED_SIZE
}

import { MARKER_IW_BOARD_FOR_FLEET } from '../../actions/board-settings'

class FMSMonitoring extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {
      _polylines: Array,
      _markers: Array,
      _boundCoords: Array,
      fleets: Array,
      tracks: Array,
      focusedFleet: Object,
      map: Object,
      googleMap: Object
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
    // if (changes.has('map') && this.map) {
    //   var search = document.createElement('common-search')
    //   search.style.cssText = `
    //     width: 300px;
    //     height: 500px;
    //   `

    //   this.map.controls[google.maps.ControlPosition.LEFT].push(search)
    // }

    if (changes.has('map') || changes.has('fleets')) {
      this.map && this.updateMapComponents()
    }

    if (changes.has('focusedFleet')) {
      this.map && this.changeFocusedFleet(this.focusedFleet, changes.get('focusedFleet'))
    }
  }

  updateMapComponents() {
    var fleetBoardId = this.fleetBoardId

    var fleets = (this.fleets || []).map(fleet => {
      var { name, latlng, parameters } = fleet
      var [lat, lng] = latlng.split(',').map(parseFloat)
      var position = { lat, lng }

      return {
        title: name,
        position: { lat, lng },
        icon: NORMAL_ICON,
        get content() {
          var content = document.createElement('marker-info-content')
          content.boardId = fleetBoardId
          content.data = {
            name,
            position,
            parameters
          }

          return content
        }
      }
    })

    var { polylines, markers, boundCoords } = MapBuilder.createMapComponents(fleets, [])

    markers.forEach(marker => {
      google.maps.event.addListener(marker, 'click', e => {
        var focusedFleet = this.fleets.find(fleet => {
          return fleet.name == marker.content.data.name
        })

        setFocusedFleet(focusedFleet)
      })
    })

    google.maps.event.addListener(this.map, 'click', () => {
      this.infoWindow.close(this.map)
    })

    this._polylines = polylines
    this._markers = markers
    this._boundCoords = boundCoords
  }

  stateChanged(state) {
    this.fleets = state.fleets.fleets
    this.focusedFleet = state.fleets.focusedFleet

    this.fleetBoardId = (state.boardSetting[MARKER_IW_BOARD_FOR_FLEET] || { board: {} }).board.id
  }

  get infoWindow() {
    if (!this._infoWindow) {
      this._infoWindow = new google.maps.InfoWindow({
        content: 'loading...'
      })
    }

    return this._infoWindow
  }

  setFocus(focus, icon) {
    focus.setZIndex(1000)
    focus.setIcon(icon)
  }

  resetFocus(focus, icon) {
    focus.setZIndex(0)
    focus.setIcon(icon)
  }

  async changeFocusedFleet(after, before) {
    if (before) {
      var idx = this.fleets.findIndex(fleet => fleet.name == before.name)
      idx !== -1 && this._markers && this.resetFocus(this._markers[idx], NORMAL_ICON)
    }

    if (after) {
      var idx = this.fleets.findIndex(fleet => fleet.name == after.name)
      idx !== -1 && this._markers && this.setFocus(this._markers[idx], FOCUSED_ICON)

      var marker = this._markers[idx]
      if (marker.content) {
        this.infoWindow.open(this.map, marker)
        this.infoWindow.setContent(marker.content)
      }
    }
  }
}

window.customElements.define('fms-monitoring', FMSMonitoring)
