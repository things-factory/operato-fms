import { UPDATE_FLEETS } from '../'

export async function fetchFleets({ page, limit, sorters = [] }) {
  this.total = 300

  return await {
    total: 300,
    records: Array(50)
      .fill()
      .map(() => {
        var num = ~~(Math.random() * 100)
        return {
          client: 'Client-' + num,
          delivery: 'Delivery-' + num,
          device: 'Device-' + num,
          status: Math.random() - 0.5 > 0 ? 0 : 1,
          battery: ~~(Math.random() * 100)
        }
      })
  }
}
