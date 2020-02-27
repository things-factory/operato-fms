import { UPDATE_OPERATO_FMS } from '../actions/main'

const INITIAL_STATE = {
  operatoFms: 'ABC'
}

const operatoFms = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_OPERATO_FMS:
      return { ...state }

    default:
      return state
  }
}

export default operatoFms
