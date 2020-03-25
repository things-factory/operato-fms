import { store } from '@things-factory/shell'

function latlng(lat, lng) {
  return `${lat},${lng}`
}

export const UPDATE_FLEETS = 'UPDATE_FLEETS'
export async function searchFleets({ device, client, delivery, fromdate, todate } = {}) {
  var fleets = await Array(50)
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

  store.dispatch({
    type: UPDATE_FLEETS,
    fleets: {
      fleets,
      search: {
        device,
        client,
        delivery,
        fromdate,
        todate
      }
    }
  })
}
