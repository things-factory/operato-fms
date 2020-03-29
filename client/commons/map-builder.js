export class MapBuilder {
  static createMapComponents(fleets = [], tracks = []) {
    var positions = [...fleets, ...tracks]

    var markers = positions.map(spot => {
      var { title, position } = spot
      return new google.maps.Marker({
        title,
        position,
        icon: spot.icon,
        content: spot.content
      })
    })

    var path = tracks.map(spot => spot.position)

    var polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    var polylines = [polyline]

    var boundCoords = positions.map(spot => spot.position)

    return {
      markers,
      polylines,
      boundCoords
    }
  }
}
