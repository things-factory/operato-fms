import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import { localize, i18next } from '@things-factory/i18n-base'
import '@things-factory/grist-ui'

import { searchFleets, setFocusedFleet } from '../actions/fleets'

export class CommonSearch extends connect(store)(localize(i18next)(LitElement)) {
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
      search: Object,
      config: Object,
      fleets: Object
    }
  }

  stateChanged(state) {
    this.search = state.fleets.search
    this.fleets = state.fleets.fleets
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
            setFocusedFleet(record)
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

  render() {
    var { device = '', client = '', delivery = '', fromdate, todate } = this.search || {}
    var fleets = this.fleets || []
    var data = {
      total: fleets.length,
      records: fleets
    }

    return html`
      <div @change=${this.onchangeSearch.bind(this)} search>
        <label>client id</label>
        <input name="client" type="text" .value=${client} />

        <label>delivery id</label>
        <input name="delivery" type="text" .value=${delivery} />

        <label>date range</label>
        <input name="fromdate" type="date" .value=${fromdate} />~<input name="todate" type="date" .value=${todate} />

        <label>device id</label>
        <input name="device" type="text" .value=${device} />
      </div>

      <div>total : ${fleets.length}</div>

      <data-grist .mode=${isMobileDevice() ? 'LIST' : 'GRID'} .config=${this.config} .data=${data}></data-grist>
    `
  }

  onchangeSearch(e) {
    var target = e.target

    searchFleets({
      ...this.search,
      [target.name]: target.value
    })
  }
}

customElements.define('common-search', CommonSearch)
