import { EVENT_ICONS } from './marker-icons'
const SCALED_SIZE = { width: 24, height: 24 }

export class TrackBuilder {
  static createTracks(tracks) {
    var path = tracks.map(spot => spot.position)

    var polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    var polylines = [polyline]

    var markers = tracks.map(spot => {
      let name = `(${spot.position.lat},${spot.position.lng})`
      return new google.maps.Marker({
        name,
        position: spot.position,
        icon: {
          url: EVENT_ICONS[~~(Math.random() * 7)],
          scaledSize: SCALED_SIZE
        },
        title: name,
        content: spot.content
      })
    })

    return {
      markers,
      polylines,
      boundCoords: path
    }
  }
}
