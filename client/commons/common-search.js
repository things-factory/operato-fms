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
          grid-template-columns: repeat(10, 1fr);
          grid-gap: 5px;

          align-items: center;
        }

        [search] > * {
          box-sizing: border-box;
          margin: 0;

          color: var(--secondary-text-color);
          font: normal 13px var(--theme-font);
        }

        [search] label {
          grid-column: span 3;
          text-transform: capitalize;
          font-weight: bold;
          text-align: right;
          align-self: center;
        }

        [search] > input,
        [search] > select,
        [wrap] {
          grid-column: span 7;
          border: 1px solid rgba(0, 0, 0, 0.2);
          align-self: stretch;
        }

        [wrap] {
          display: flex;
          align-items: stretch;
          border: 0;
        }

        [wrap] input {
          flex: 1;
          margin: 0;
          min-width: 0;
        }

        input {
          border: 1px solid rgba(0, 0, 0, 0.2);
          background-color: transparent;
        }

        [search-result] {
          padding: 3px 0 5px 3px;
          font: normal 13px var(--theme-font);
          color: var(--secondary-text-color);
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
      fleets: Object,
      focusedFleetId: String
    }
  }

  stateChanged(state) {
    this.search = state.fleets.search
    this.fleets = state.fleets.fleets
    this.focusedFleetId = state.fleets.focusedFleetId
  }

  updated(changes) {
    if (changes.has('focusedFleetId')) {
      // TODO focused 레코드를 자동으로 변경한다. Map과 데이타를 동기화 하기위함임.
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
            setFocusedFleet(record.id)
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
        <div wrap>
          <input name="fromdate" type="date" .value=${fromdate} />&nbsp;-&nbsp;<input
            name="todate"
            type="date"
            .value=${todate}
          />
        </div>

        <label>device id</label>
        <input name="device" type="text" .value=${device} />
      </div>

      <div search-result>total : <strong>${fleets.length}</strong></div>

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
