import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-button'
import '@material/mwc-textfield'
import { store, PageView } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'

import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import { MapBuilder } from '../../commons/map-builder'
import { searchFleets, setFocusedFleet } from '../../actions/fleets'

import '../../commons/fleet-search'
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
      fleetId: String,
      trackId: String,
      map: Object,
      googleMap: Object,
      search: Object
    }
  }

  static get styles() {
    return [ScrollbarStyles, FMSPageStyles]
  }

  get context() {
    return {
      title: i18next.t('title.monitoring')
    }
  }

  render() {
    var { device = '', client = '', delivery = '', fromdate, todate } = this.search || {}

    return html`
      <form @change=${this.onchangeSearch.bind(this)} search>
        <mwc-textfield label="device" icon="router" .value=${device}></mwc-textfield>
        <mwc-textfield label="client" icon="domain" .value=${client}></mwc-textfield>
        <mwc-textfield label="delivery" icon="local_shipping" .value=${delivery}></mwc-textfield>
        <mwc-textfield label="from date" icon="event" type="date" .value=${fromdate}></mwc-textfield>
        <mwc-textfield label="to date" icon="event" type="date" .value=${todate}></mwc-textfield>
        <mwc-button outlined label="search"></mwc-button>
      </form>

      <div main>
        <fleet-search sidebar @tracks=${e => (this.tracks = e.detail)}></fleet-search>
        <common-map
          main
          .polylines=${this._polylines}
          .markers=${this._markers}
          .boundCoords=${this._boundCoords}
          @map-change=${e => (this.map = e.detail)}
        >
        </common-map>
      </div>
    `
  }

  updated(changes) {
    // if (changes.has('map') && this.map) {
    //   var search = document.createElement('fleet-search')
    //   search.style.cssText = `
    //     width: 300px;
    //     height: 500px;
    //   `

    //   this.map.controls[google.maps.ControlPosition.LEFT].push(search)
    // }

    if (changes.has('map') || changes.has('fleets')) {
      this.map && this.updateMapComponents()
    }

    if (changes.has('fleetId')) {
      this.map && this.changeFleetId(this.fleetId, changes.get('fleetId'))
    }
  }

  updateMapComponents() {
    var fleetBoardId = this.fleetBoardId

    var fleets = (this.fleets || []).map(fleet => {
      var { id, name, latlng, delivery, client, driver, parameters } = fleet
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
            id,
            name,
            delivery,
            client,
            driver,
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
          return fleet.id == marker.content.data.id
        })

        setFocusedFleet(focusedFleet.id)
      })
    })

    google.maps.event.addListener(this.map, 'click', () => {
      this.infoWindow.close(this.map)
    })

    this._polylines = polylines
    this._markers = markers
    this._boundCoords = boundCoords
  }

  pageUpdated(changes, lifecycle) {
    if ('params' in changes) {
      var { fleetId, trackId } = changes.params
      if (fleetId) {
        setFocusedFleet(fleetId)
      }
    }
  }

  stateChanged(state) {
    this.fleets = state.fleets.fleets
    this.fleetId = state.fleets.focusedFleetId
    this.search = state.fleets.search

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

  async changeFleetId(after, before) {
    if (before) {
      var idx = this.fleets.findIndex(fleet => fleet.id == before)
      idx !== -1 && this._markers && this.resetFocus(this._markers[idx], NORMAL_ICON)
    }

    if (after) {
      var idx = this.fleets.findIndex(fleet => fleet.id == after)
      idx !== -1 && this._markers && this.setFocus(this._markers[idx], FOCUSED_ICON)

      var marker = this._markers[idx]
      if (marker.content) {
        this.infoWindow.open(this.map, marker)
        this.infoWindow.setContent(marker.content)
      }
    }
  }

  onchangeSearch(e) {
    var target = e.target

    searchFleets({
      ...this.search,
      [target.name]: target.value
    })
  }
}

window.customElements.define('fms-monitoring', FMSMonitoring)
