import { EVENT_ICONS } from './marker-icons'

const SCALED_SIZE = { width: 24, height: 24 }

export class MapBuilder {
  static createMapComponents(fleets = [], tracks = []) {
    var markers = fleets.map(spot => {
      var { title, position } = spot
      return new google.maps.Marker({
        title,
        position,
        icon: {
          url: EVENT_ICONS[~~(Math.random() * 7)],
          scaledSize: SCALED_SIZE
        },
        content: spot.content
      })
    })

    markers = markers.concat(
      tracks.map(spot => {
        var { title, position } = spot
        return new google.maps.Marker({
          title,
          position,
          icon: {
            url: EVENT_ICONS[~~(Math.random() * 7)],
            scaledSize: SCALED_SIZE
          },
          content: spot.content
        })
      })
    )

    var path = tracks.map(spot => spot.position)

    var polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    var polylines = [polyline]

    var boundCoords = tracks.map(spot => spot.position).concat(fleets.map(spot => spot.position))

    return {
      markers,
      polylines,
      boundCoords
    }
  }
}
