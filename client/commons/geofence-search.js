import { LitElement, html, css } from 'lit-element'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import { i18next } from '@things-factory/i18n-base'
import '@things-factory/grist-ui'

import { fetchGeofence } from './fetch-geofence'

export class GenfenceSearch extends LitElement {
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        [search] {
          display: grid;
          grid-template-columns: 2fr 3fr;
          margin: 4px;
        }

        data-grist {
          --grist-padding: 0px;
          overflow-y: auto;
          flex: 1;
        }
      `
    ]
  }

  static get properties() {
    return {
      config: Object,
      data: Object,
      total: Number
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.config = {
      list: { fields: ['name', 'client', 'type', 'event'] },
      pagination: { infinite: true },
      rows: {
        selectable: false,
        appendable: false,
        handlers: {
          click: (columns, data, column, record, rowIndex) => {
            var geofence = fetchGeofence(record.track)

            this.dispatchEvent(
              new CustomEvent('geofence', {
                detail: geofence
              })
            )
          }
        }
      },
      columns: [
        { type: 'gutter', gutterName: 'sequence' },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.name'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.name'), key: 'name', width: 50, type: 'string' },
          sortable: true,
          width: 80
        },
        {
          type: 'string',
          name: 'client',
          header: i18next.t('field.client'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.client'), key: 'client', width: 50, type: 'string' },
          sortable: true,
          width: 80
        },
        {
          type: 'string',
          name: 'type',
          header: i18next.t('field.type'),
          record: { editable: false, align: 'center' },
          imex: { header: i18next.t('field.type'), key: 'type', width: 50, type: 'string' },
          sortable: true,
          width: 80
        },
        {
          type: 'number',
          name: 'event',
          header: 'event', // i18next.t('field.event'),
          record: {
            editable: false,
            align: 'center',
            renderer: function(value, column, record, rowIndex, field) {
              var backcolor = value > 2 ? '#C8414C' : value > 0 ? '#EEBB54' : '#96C564'
              return html`
                <div style="color:white;background-color:${backcolor};border-radius:3px;">${value}</div>
              `
            }
          },
          imex: { header: i18next.t('field.event'), key: 'event', width: 50, type: 'string' },
          sortable: true,
          width: 40
        }
      ]
    }
  }

  async firstUpdated() {
    await this.updateComplete
    this.renderRoot.querySelector('data-grist').fetch({ limit: 50 })
  }

  render() {
    return html`
      <div search>
        <label>client id</label>
        <select></select>

        <label>geofence id</label>
        <select></select>

        <label>type</label>
        <select></select>
      </div>

      <div>total : ${this.total}</div>

      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler=${this.fetchHandler.bind(this)}
      ></data-grist>
    `
  }

  async fetchHandler({ page, limit, sorters = [] }) {
    this.total = 10

    return {
      total: 10,
      records: Array(10)
        .fill()
        .map(() => {
          var num = ~~(Math.random() * 100)
          return {
            client: 'Client-' + num,
            name: 'Geofence-' + num,
            type: ['Inbound', 'Outbound'][~~(Math.random() * 2)],
            event: ~~(Math.random() * 5)
          }
        })
    }
  }
}

customElements.define('geofence-search', GenfenceSearch)
