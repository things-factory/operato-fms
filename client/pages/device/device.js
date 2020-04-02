import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-textfield'
import { store, PageView } from '@things-factory/shell'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import { fetchDevices } from '../../commons/fetch-device'

class FMSDevice extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {}
  }

  static get styles() {
    return [ScrollbarStyles, FMSPageStyles]
  }

  get context() {
    return {
      title: i18next.t('title.device'),
      exportable: {
        accept: ['json'],
        name: 'device',
        data: () => {
          return []
        }
      },
      actions: [
        {
          title: i18next.t('button.register'),
          action: this.register.bind(this)
        }
      ]
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
          name: 'device',
          header: i18next.t('field.device'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.device'), key: 'device', width: 50, type: 'string' },
          sortable: true,
          width: 150
        },
        {
          type: 'string',
          name: 'status',
          header: i18next.t('field.status'),
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
          imex: { header: i18next.t('field.status'), key: 'status', width: 50, type: 'string' },
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
    return await fetchDevices({ page, limit, sorters })
  }

  register() {}
}

window.customElements.define('fms-device', FMSDevice)
