import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-button'
import { store, PageView } from '@things-factory/shell'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

class FMSAdmin extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {}
  }

  static get styles() {
    return [ScrollbarStyles, FMSPageStyles]
  }

  get context() {
    return {
      title: i18next.t('title.device')
    }
  }

  render() {
    return html``
  }

  pageUpdated(changes, lifecycle) {
    if (this.active) {
    } else {
    }
  }
}

window.customElements.define('fms-admin', FMSAdmin)
