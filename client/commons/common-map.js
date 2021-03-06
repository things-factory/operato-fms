import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { ScrollbarStyles } from '@things-factory/styles'

import GoogleMapLoader from './google-map-loader'

export class CommonMap extends connect(store)(LitElement) {
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
        }

        [map] {
          flex: 1;
        }

        .gm-style .gm-style-iw-c {
          padding: 0;
        }

        .gm-style .gm-style-iw-d {
          overflow: auto !important;
        }
        .gm-style .gm-style-iw-d + button {
          top: 0 !important;
          right: 0 !important;
        }
      `
    ]
  }

  static get properties() {
    return {
      center: Object,
      zoom: Number,
      map: Object,
      locations: Array,
      focused: Object,
      polygons: Array,
      polylines: Array,
      markers: Array,
      boundCoords: Array,
      controls: Object
    }
  }

  stateChanged(state) {
    this.defaultCenter = state.fleets.location
  }

  get anchor() {
    return this.shadowRoot.querySelector('[map]')
  }

  async readyMap() {
    await GoogleMapLoader.load()

    if (this.map) {
      return
    }

    var show = (center, zoom) => {
      try {
        const map = new google.maps.Map(this.anchor, {
          zoom,
          center
        })

        this.markers && this.markers.forEach(marker => marker.setMap(map))

        this.map = map

        this.dispatchEvent(
          new CustomEvent('map-change', {
            detail: this.map
          })
        )

        this.resetBounds()
      } catch (e) {
        console.error(e)
      }
    }

    var { center, zoom = 10 } = this

    /* center 속성이 설정되어있지 않으면, 현재 위치를 구해서 지도의 center로 설정한다. */
    if (!center && 'geolocation' in navigator && !this.boundCoords?.length) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => show({ lat, lng }, zoom),
        err => {
          console.warn(`navigator.geolocation.getCurrentPosition failed. (${err.code}): ${err.message}`)
          show(this.defaultCenter, zoom)
        },
        {
          /* https://stackoverflow.com/questions/3397585/navigator-geolocation-getcurrentposition-sometimes-works-sometimes-doesnt */
          timeout: 500
        }
      )
    } else {
      show(center, zoom)
    }
  }

  async firstUpdated() {
    await this.readyMap()
  }

  async buildMarkers(locations = []) {
    await this.readyMap()

    if (this.markers) {
      this.markers.forEach(marker => marker.setMap(null))
      this.markers = []
    }

    this.markers = locations.map(location => {
      let marker = new google.maps.Marker({
        ...location,
        map: this.map
      })

      google.maps.event.addListener(marker, 'click', e => {
        if (location.content) {
          var infowindow = this.infoWindow
          infowindow.open(this.map, marker)
          infowindow.setContent(location.content)
        }
      })

      return marker
    })
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
    focus.setZIndex(1)
    focus.setIcon(icon)
  }

  resetFocus(focus, icon) {
    focus.setZIndex(0)
    focus.setIcon(icon)
  }

  async changeFocus(after, before) {
    await this.readyMap()

    var locations = this.locations || []

    if (before) {
      var idx = locations.findIndex(
        location =>
          location.name == before.name &&
          location.position.lat == before.position.lat &&
          location.position.lng == before.position.lng
      )
      idx !== -1 && this.markers && this.resetFocus(this.markers[idx], locations[idx].icon)
    }

    if (after) {
      var idx = locations.findIndex(
        location =>
          location.name == after.name &&
          location.position.lat == after.position.lat &&
          location.position.lng == after.position.lng
      )
      idx !== -1 && this.markers && this.setFocus(this.markers[idx], after.icon)
    }
  }

  updated(changes) {
    if (changes.has('locations')) {
      this.buildMarkers(this.locations)
    }

    if (changes.has('focused')) {
      this.changeFocus(this.focused, changes.get('focused'))
    }

    if (changes.has('center')) {
      this.map.setCenter(this.center)
    }

    if (changes.has('polygons')) {
      ;(changes.get('polygons') || []).forEach(geofence => geofence.setMap(null))
      ;(this.polygons || []).forEach(geofence => geofence.setMap(this.map))
    }

    if (changes.has('polylines')) {
      ;(changes.get('polylines') || []).forEach(polyline => polyline.setMap(null))
      ;(this.polylines || []).forEach(polyline => polyline.setMap(this.map))
    }

    if (changes.has('markers')) {
      ;(changes.get('markers') || []).forEach(marker => marker.setMap(null))
      ;(this.markers || []).forEach(marker => marker.setMap(this.map))
    }

    if (changes.has('boundCoords')) {
      this.resetBounds()
    }
  }

  render() {
    return html`
      <div map></div>
    `
  }

  resetBounds() {
    if (!this.boundCoords || this.boundCoords.length < 1) {
      return
    }

    var bounds = new google.maps.LatLngBounds()
    this.boundCoords.forEach(coord => bounds.extend(coord))
    this.map.fitBounds(bounds)
  }
}

customElements.define('common-map', CommonMap)
