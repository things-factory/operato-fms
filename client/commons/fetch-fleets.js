import Chance from 'chance'

function latlng(lat, lng) {
  return `${lat},${lng}`
}

export async function fetchFleets({ page, limit, sorters = [] } = {}) {
  var chance = new Chance()
  var now = Date.now()
  var date = new Date(now).toISOString().slice(0, 10)

  return await {
    total: 300,
    records: Array(50)
      .fill()
      .map(() => {
        var status = ~~(Math.random() * 5)
        var id = chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true })
        var updatedAt = now - 60 * 1000

        return {
          id,
          name: id,
          client: 'ebay',
          delivery: date + '-' + ~~(Math.random() * 1000),
          device: 'wizxyz-' + ~~(Math.random() * 10000),
          driver: chance.name(),
          status,
          battery: status > 0 ? ~~(Math.random() * 100) : 0,
          latlng: latlng(37.5326 + Math.random() / 2 - 0.25, 127.024612 + Math.random() / 2 - 0.25),
          updatedAt: new Date(updatedAt).toISOString(),
          parameters: {
            temperature: ~~(Math.random() * 100),
            humidity: ~~(Math.random() * 100),
            illuminance: ~~(Math.random() * 1000),
            shock: ~~(Math.random() * 100),
            airPressure: ~~(Math.random() * 1500),
            breakdown: !!~~(Math.random() * 2),
            smoking: !!~~(Math.random() * 2)
          }
        }
      })
  }
}
