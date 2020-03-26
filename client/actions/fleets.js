import { store } from '@things-factory/shell'
import { fetchFleets } from '../commons/fetch-fleets'

export const UPDATE_FLEETS = 'UPDATE_FLEETS'

export async function searchFleets({ device, client, delivery, fromdate, todate } = {}) {
  var fleets = (await fetchFleets()).records

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
