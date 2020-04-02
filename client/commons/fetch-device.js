import Chance from 'chance'

export async function fetchDevices({ page, limit, sorters = [] } = {}) {
  var chance = new Chance()
  var date = new Date().toISOString().slice(0, 10)

  return await {
    total: 300,
    records: Array(50)
      .fill()
      .map(() => {
        var status = Math.random() - 0.5 > 0 ? 0 : 1
        var id = chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true })

        return {
          id,
          name: id,
          client: 'ebay',
          delivery: date + '-' + ~~(Math.random() * 1000),
          device: 'wizxyz-' + ~~(Math.random() * 10000),
          driver: chance.name(),
          status,
          battery: status == 0 ? 0 : ~~(Math.random() * 100),
          registration: Date.now() - ~~(Math.random() * 100000000)
        }
      })
  }
}
