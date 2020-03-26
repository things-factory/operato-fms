import { UPDATE_FLEETS } from '../'

function latlng(lat, lng) {
  return `${lat},${lng}`
}

export async function fetchFleets({ page, limit, sorters = [] } = {}) {
  return await {
    total: 300,
    records: Array(50)
      .fill()
      .map(() => {
        var num = ~~(Math.random() * 100)
        return {
          name: 'Fleet' + num,
          client: 'Client-' + num,
          delivery: 'Delivery-' + num,
          device: 'Device-' + num,
          status: Math.random() - 0.5 > 0 ? 0 : 1,
          battery: ~~(Math.random() * 100),
          latlng: latlng(37.5326 + Math.random() / 2 - 0.25, 127.024612 + Math.random() / 2 - 0.25),
          parameters: {
            a: 1,
            b: 2
          }
        }
      })
  }
}
