import { UPDATE_BOARD_SETTINGS, CLEAR_BOARD_SETTINGS } from '../actions/board-settings'

const INITIAL_STATE = {}

const boardSetting = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_BOARD_SETTINGS:
      return {
        ...state,
        ...action.settings
      }

    case CLEAR_BOARD_SETTINGS:
      return {}

    default:
      return state
  }
}

export default boardSetting
