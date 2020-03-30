import { UPDATE_FLEETS } from '../actions/fleets'

let today = new Date().toISOString().slice(0, 10)

const INITIAL_STATE = {
  location: {
    lat: 37.566,
    lng: 126.9784
  },
  search: {
    device: '',
    client: '',
    delivery: '',
    fromdate: today,
    todate: today
  },
  fleets: [],
  focusedFleetId: null
}

const fleets = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FLEETS:
      return {
        ...state,
        ...action.fleets
      }

    default:
      return state
  }
}

export default fleets
