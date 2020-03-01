import { html } from 'lit-element'
import { store } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'
import { ADD_SETTING } from '@things-factory/setting-base'

import { UPDATE_DASHBOARD_SETTINGS } from './actions/dashboard-settings'
import { fetchDashboardSettings } from './viewparts/fetch-dashboard-settings'

import dashboard from './reducers/dashboard-settings'

import './viewparts/user-circle'
import './viewparts/top-menus'
import './viewparts/dashboard-setting-let'

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
  store.addReducers({ dashboard })

  /* 사용자 signin/signout 에 따라서, setting 변경 */
  auth.on('profile', async () => {
    // fetch operato-ecs settings
    var settings = await fetchDashboardSettings()

    store.dispatch({
      type: UPDATE_DASHBOARD_SETTINGS,
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

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <top-menus></top-menus>
      `,
      position: TOOL_POSITION.CENTER
    }
  })

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <span style="font-size: 1.0em;">Notification</span>
      `,
      position: TOOL_POSITION.REAR
    }
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

  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 20,
      template: html`
        <dashboard-setting-let></dashboard-setting-let>
      `
    }
  })
}
