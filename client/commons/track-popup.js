import { css, html, LitElement } from 'lit-element'

import './common-map'
import { TrackBuilder } from './track-builder'

class TrackPopup extends LitElement {
  static get properties() {
    return {
      _polylines: Array,
      _markers: Array,
      _boundCoords: Array,
      tracks: Array,
      map: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;

          background-color: gray;
        }

        common-map {
          flex: 1;
        }
      `
    ]
  }

  render() {
    return html`
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
    if (changes.has('map') || changes.has('tracks')) {
      this.map && this.tracks && this.createTracks()
    }
  }

  createTracks() {
    var { polylines, markers, boundCoords } = TrackBuilder.createTracks(this.tracks)

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

  get infoWindow() {
    if (!this._infoWindow) {
      this._infoWindow = new google.maps.InfoWindow({
        content: 'loading...'
      })
    }

    return this._infoWindow
  }
}

window.customElements.define('track-popup', TrackPopup)
