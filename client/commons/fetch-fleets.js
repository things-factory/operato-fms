function latlng(lat, lng) {
  return `${lat},${lng}`
}

export async function fetchFleets({ page, limit, sorters = [] } = {}) {
  return await {
    total: 300,
    records: Array(50)
      .fill()
      .map((_, idx) => {
        var num = idx + 1
        return {
          id: idx,
          name: 'Fleet' + num,
          client: 'Client-' + num,
          delivery: 'Delivery-' + num,
          device: 'Device-' + num,
          status: Math.random() - 0.5 > 0 ? 0 : 1,
          battery: ~~(Math.random() * 100),
          latlng: latlng(37.5326 + Math.random() / 2 - 0.25, 127.024612 + Math.random() / 2 - 0.25),
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
