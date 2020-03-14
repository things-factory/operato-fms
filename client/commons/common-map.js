import { LitElement, html, css } from 'lit-element'

import GoogleMapLoader from './google-map-loader'

export class CommonMap extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        [map] {
          flex: 1;
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
      boundCoords: Array
    }
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

    if (!center && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position =>
          show(
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoom
          ),
        err => alert(`Error (${err.code}): ${err.message}`)
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
