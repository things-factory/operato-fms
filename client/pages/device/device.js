import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-button'
import { store, PageView } from '@things-factory/shell'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import '../../commons/common-search'

class FMSDevice extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {}
  }

  static get styles() {
    return [ScrollbarStyles, FMSPageStyles]
  }

  render() {
    return html`
      <common-search sidebar></common-search>

      <div main>
        <div header>
          <label>Device</label>
          <mwc-button label=${i18next.t('button.register')}> </mwc-button>
          <mwc-button label=${i18next.t('button.export')}> </mwc-button>
        </div>
        <data-grist
          .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
          .config=${this.config}
          .fetchHandler=${this.fetchHandler.bind(this)}
        >
        </data-grist>
      </div>
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
          name: 'device',
          header: i18next.t('field.device'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.device'), key: 'device', width: 50, type: 'string' },
          sortable: true,
          width: 150
        },
        {
          type: 'string',
          name: 'monitoring',
          header: i18next.t('field.monitoring'),
          record: {
            editable: false,
            align: 'center',
            renderer: function(value, column, record, rowIndex, field) {
              var state = value ? 'ON' : 'OFF'
              var backcolor = value ? '#5C9CD5' : '#C5C8D1'
              return html`
                <div style="color:white;background-color:${backcolor};border-radius:3px;">${state}</div>
              `
            }
          },
          imex: { header: i18next.t('field.monitoring'), key: 'monitoring', width: 50, type: 'string' },
          sortable: true,
          width: 60
        },
        {
          type: 'number',
          name: 'battery',
          header: i18next.t('field.battery'),
          record: {
            editable: false,
            align: 'center',
            renderer: function(value, column, record, rowIndex, field) {
              var backcolor = value < 30 ? '#C8414C' : value < 80 ? '#EEBB54' : '#96C564'
              return html`
                <div style="color:white;background-color:${backcolor};border-radius:3px;">${value}%</div>
              `
            }
          },
          imex: { header: i18next.t('field.battery'), key: 'battery', width: 50, type: 'string' },
          sortable: true,
          width: 60
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
            device: 'Device-' + num,
            monitoring: Math.random() - 0.5 > 0 ? 0 : 1,
            battery: ~~(Math.random() * 100),
            registration: Date.now() - ~~(Math.random() * 100000000)
          }
        })
    }
  }
}

window.customElements.define('fms-device', FMSDevice)
