import { LitElement, html, css } from 'lit-element'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import { i18next } from '@things-factory/i18n-base'
import '@things-factory/grist-ui'

import { fetchTrack } from './fetch-track'

export class CommonSearch extends LitElement {
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 10px 15px;
          background-color: var(--main-section-background-color);
        }

        [search] {
          display: grid;
          grid-template-columns: 2fr 3fr;
          margin: 4px;
        }
        [search] * {
          margin: 1px 0 4px 0;
          color: var(--secondary-text-color);
          font: normal 13px var(--theme-font);
        }

        [search] label {
          text-transform: capitalize;
          font-weight: bold;
        }

        [search] input,
        [search] select {
          border: 1px solid rgba(0, 0, 0, 0.2);
          background-color: transparent;
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
      list: { fields: ['client', 'delivery', 'device', 'status', 'battery'] },
      pagination: { infinite: true },
      rows: {
        selectable: false,
        appendable: false,
        handlers: {
          click: (columns, data, column, record, rowIndex) => {
            var tracks = fetchTrack(record.track)

            this.dispatchEvent(
              new CustomEvent('tracks', {
                detail: tracks
              })
            )
          }
        }
      },
      columns: [
        { type: 'gutter', gutterName: 'sequence' },
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
          name: 'delivery',
          header: i18next.t('field.delivery'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.delivery'), key: 'delivery', width: 50, type: 'string' },
          sortable: true,
          width: 80
        },
        {
          type: 'string',
          name: 'device',
          header: i18next.t('field.device'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.device'), key: 'device', width: 50, type: 'string' },
          sortable: true,
          width: 80
        },
        {
          type: 'string',
          name: 'status',
          header: i18next.t('field.status'),
          record: {
            editable: false,
            align: 'center',
            renderer: function(value, column, record, rowIndex, field) {
              var state = value ? 'online' : 'offline'
              var backcolor = value ? '#5C9CD5' : '#C5C8D1'
              return html`
                <div style="color:white;background-color:${backcolor};border-radius:3px;">${state}</div>
              `
            }
          },
          imex: { header: i18next.t('field.status'), key: 'status', width: 50, type: 'string' },
          sortable: true,
          width: 44
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

        <label>delivery id</label>
        <select></select>

        <label>date range</label>
        <select></select>

        <label>device id</label>
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
    this.total = 300

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
            status: Math.random() - 0.5 > 0 ? 0 : 1,
            battery: ~~(Math.random() * 100)
          }
        })
    }
  }
}

customElements.define('common-search', CommonSearch)
