export class MapBuilder {
  static createMapComponents(fleets = [], tracks = []) {
    const positions = [...fleets, ...tracks]

    const markers = positions.map(spot => {
      const { title, position } = spot
      return new google.maps.Marker({
        title,
        position,
        icon: spot.icon,
        content: spot.content
      })
    })

    const path = tracks.map(spot => spot.position)

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#3E9CFA',
      strokeOpacity: 0.8,
      strokeWeight: 2
    })

    const polylines = [polyline]

    const boundCoords = positions.map(spot => spot.position)

    return {
      markers,
      polylines,
      boundCoords
    }
  }
}
