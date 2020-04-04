import { html } from 'lit-element'
import { store } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import {
  appendViewpart,
  updateViewpart,
  toggleOverlay,
  TOOL_POSITION,
  VIEWPART_POSITION
} from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'
import { ADD_SETTING } from '@things-factory/setting-base'
import '@things-factory/setting-ui/client/setting-lets/domain-switch-let'

import { searchFleets } from './actions/fleets'
import { UPDATE_BOARD_SETTINGS } from './actions/board-settings'
import { fetchBoardSettings } from './viewparts/fetch-board-settings'

import boardSetting from './reducers/board-settings'
import fleets from './reducers/fleets'
import notification from './reducers/notification'

import GoogleMapLoader from './commons/google-map-loader'

import './viewparts/user-circle'
import './viewparts/menu-tools'
import './viewparts/dashboard-setting-let'
import './viewparts/infowindow-setting-let'
import './viewparts/notification-badge'
import './viewparts/notification-list'

console.log(
  `%c
  ▄▄  ▄▄▄  ▄▄▄ ▄▄▄   ▄▄  ▄▄▄  ▄▄     ▄▄▄▄▄ ▄     ▄  ▄▄▄  
 ▓  ▓ ▓  ▓ ▓   ▓  ▓ ▓  ▓  ▓  ▓  ▓    ▓     ▓▀▄ ▄▀▓ ▓   ▀ 
 ▓  ▓ ▓▀▀  ▓▀▀ ▓▀▀▄ ▓▀▀▓  ▓  ▓  ▓ ▀▀ ▓▀▀▀  ▓  ▀  ▓ ▀▀▄▄  
 ▓  ▓ ▓    ▓   ▓  ▓ ▓  ▓  ▓  ▓  ▓    ▓     ▓     ▓ ▄   ▓ 
  ▀▀  ▀    ▀▀▀ ▀  ▀ ▀  ▀  ▀   ▀▀     ▀     ▀     ▀  ▀▀▀  
`,
  'background: #222; color: #bada55'
)

export default function bootstrap() {
  /* load google-map api */
  GoogleMapLoader.load()

  /* initialize reducers */
  store.addReducers({ boardSetting, fleets, notification })

  /* get fleets information from the start */
  searchFleets()

  /* 사용자 signin/signout 에 따라서, setting 변경 */
  auth.on('profile', async () => {
    var settings = await fetchBoardSettings()

    store.dispatch({
      type: UPDATE_BOARD_SETTINGS,
      settings: settings.reduce((settings, setting) => {
        settings[setting.name] = setting
        return settings
      }, {})
    })
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span style="font-size: 1.2em;">FMS</span>
      `,
      position: TOOL_POSITION.FRONT
    }
  })

  /* append viewpart anchor to asidebar */
  appendViewpart({
    name: 'asidebar-anchor',
    viewpart: {
      show: false,
      hovering: 'edge',
      backdrop: true
    },
    position: VIEWPART_POSITION.ASIDEBAR
  })

  /* append top-menu to layout */
  var width

  appendViewpart({
    name: 'fms-topmenu',
    viewpart: {
      show: true,
      template: html`
        <menu-tools></menu-tools>
      `
    },
    position: VIEWPART_POSITION.NAVBAR
  })

  store.subscribe(async () => {
    var state = store.getState()

    if (state.layout.width == width) {
      return
    }

    width = state.layout.width

    updateViewpart('fms-topmenu', {
      position: width == 'WIDE' ? VIEWPART_POSITION.NAVBAR : VIEWPART_POSITION.FOOTERBAR
    })
  })

  /* setting app-tools */
  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <notification-badge
          @click=${e => {
            toggleOverlay('notification', {
              // backdrop: true
            })
          }}
        >
        </notification-badge>
      `,
      position: TOOL_POSITION.REAR
    }
  })

  appendViewpart({
    name: 'notification',
    viewpart: {
      show: false,
      hovering: 'edge',
      template: html`
        <notification-list style="min-width: 300px;"></notification-list>
      `
    },
    position: VIEWPART_POSITION.ASIDEBAR
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <user-circle> </user-circle>
      `,
      position: TOOL_POSITION.REAR
    }
  })

  /* for settings */
  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 10,
      template: html`
        <domain-switch-let></domain-switch-let>
      `
    }
  })

  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 20,
      template: html`
        <dashboard-setting-let></dashboard-setting-let>
      `
    }
  })

  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 20,
      template: html`
        <infowindow-setting-let></infowindow-setting-let>
      `
    }
  })
}
