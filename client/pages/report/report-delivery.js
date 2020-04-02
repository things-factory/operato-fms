import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-textfield'
import { store, PageView } from '@things-factory/shell'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'

import { ReportStyles } from './report-style'

class ReportDelivery extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {}
  }

  static get styles() {
    return [ScrollbarStyles, ReportStyles]
  }

  get context() {
    return {
      title: i18next.t('title.delivery'),
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
          type: 'string',
          name: 'delivery',
          header: i18next.t('field.delivery'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.delivery'), key: 'delivery', width: 50, type: 'string' },
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
          type: 'number',
          name: 'devices',
          header: i18next.t('field.#devices'),
          record: { editable: false, align: 'right' },
          imex: { header: i18next.t('field.#devices'), key: 'devices', width: 50, type: 'string' },
          sortable: true,
          width: 150
        },
        {
          type: 'datetime',
          name: 'registration',
          header: i18next.t('field.registration'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.registration'), key: 'registration', width: 50, type: 'string' },
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

  async fetchHandler({ page, limit, sorters = [] }) {
    return {
      total: 300,
      records: Array(50)
        .fill()
        .map(() => {
          var num = ~~(Math.random() * 100)
          return {
            client: 'Client-' + num,
            delivery: 'Delivery-' + num,
            devices: ~~(Math.random() * 20),
            registration: Date.now() - ~~(Math.random() * 100000000)
          }
        })
    }
  }
}

window.customElements.define('report-delivery', ReportDelivery)
