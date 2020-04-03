import { html, css } from 'lit-element'
import '@material/mwc-button'
import '@material/mwc-textfield'
import '@things-factory/grist-ui'
import { i18next } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'

import { ReportBasedOnTrack } from './report-based-on-track'

import { ReportStyles } from './report-style'

class ReportBreakDown extends ReportBasedOnTrack {
  static get properties() {
    return {}
  }

  static get styles() {
    return [ScrollbarStyles, ReportStyles]
  }

  get context() {
    return {
      title: i18next.t('title.breakdown'),
      exportable: {
        accept: ['json'],
        name: 'device',
        data: () => {
          return []
        }
      }
    }
  }

  render() {
    return html`
      <form search>
        <mwc-textfield label="device" icon="router"></mwc-textfield>
        <mwc-textfield label="client" icon="domain"></mwc-textfield>
        <mwc-textfield label="delivery" icon="local_shipping"></mwc-textfield>
        <mwc-textfield label="from date" icon="event" type="date"></mwc-textfield>
        <mwc-textfield label="to date" icon="event" type="date"></mwc-textfield>
        <mwc-button label="search" icon="search" raised></mwc-button>
      </form>

      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler=${this.fetchHandler.bind(this)}
      >
      </data-grist>
    `
  }

  connectedCallback() {
    super.connectedCallback()

    this.config = {
      list: { fields: ['client', 'delivery', 'device', 'status', 'battery'] },
      pagination: { infinite: false },
      rows: { selectable: false, appendable: false },
      columns: [
        { type: 'gutter', gutterName: 'sequence' },
        {
          type: 'gutter',
          gutterName: 'button',
          icon: 'place',
          handlers: {
            click: this.showTrack.bind(this)
          }
        },
        {
          type: 'string',
          name: 'device',
          header: i18next.t('field.device'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.device'), key: 'device', width: 50, type: 'string' },
          sortable: true,
          width: 150
        },
        {
          type: 'string',
          name: 'client',
          header: i18next.t('field.client'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.client'), key: 'client', width: 50, type: 'string' },
          sortable: true,
          width: 150
        },
        {
          type: 'string',
          name: 'delivery',
          header: i18next.t('field.delivery'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.delivery'), key: 'delivery', width: 50, type: 'string' },
          sortable: true,
          width: 150
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: i18next.t('field.updated_at'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.updated_at'), key: 'updatedAt', width: 50, type: 'string' },
          sortable: true,
          width: 180
        }
      ]
    }
  }

  async firstUpdated() {
    await this.updateComplete
    this.renderRoot.querySelector('data-grist').fetch({ limit: 50 })
  }

  pageUpdated(changes, lifecycle) {
    if (this.active) {
    } else {
    }
  }
}

window.customElements.define('report-breakdown', ReportBreakDown)
