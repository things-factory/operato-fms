import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-button'
import { store, PageView } from '@things-factory/shell'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'
import { openPopup } from '@things-factory/layout-base'

import { fetchTrack } from '../../commons/fetch-track'
import '../../commons/common-search'
import '../../commons/track-popup'
import '../../commons/marker-info-content'

import { ReportStyles } from './report-style'
import { MARKER_IW_BOARD_FOR_TRACK } from '../../actions/board-settings'

class ReportHumidity extends connect(store)(localize(i18next)(PageView)) {
  static get properties() {
    return {}
  }

  static get styles() {
    return [ScrollbarStyles, ReportStyles]
  }

  render() {
    return html`
      <common-search sidebar></common-search>

      <div main>
        <div header>
          <label><a href="fms-report">Report</a> > Humidity</label>
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
          type: 'gutter',
          gutterName: 'button',
          icon: 'place',
          handlers: {
            click: this.showTrack.bind(this)
          }
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
          type: 'string',
          name: 'device',
          header: i18next.t('field.device'),
          record: { editable: false, align: 'left' },
          imex: { header: i18next.t('field.device'), key: 'device', width: 50, type: 'string' },
          sortable: true,
          width: 150
        },
        {
          type: 'number',
          name: 'value',
          header: i18next.t('field.value') + '(%)',
          record: { editable: false, align: 'right' },
          imex: { header: i18next.t('field.value'), key: 'value', width: 50, type: 'number' },
          sortable: true,
          width: 150
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: i18next.t('field.updated_at'),
          record: { editable: false, align: 'center' },
          sortable: true,
          width: 180
        }
      ]
    }
  }

  stateChanged(state) {
    this.trackBoardId = (state.boardSetting[MARKER_IW_BOARD_FOR_TRACK] || { board: {} }).board.id
  }

  showTrack() {
    var boardId = this.trackBoardId
    var template = document.createElement('track-popup')

    template.tracks = fetchTrack().map(track => {
      var { name, lat, lng, parameters } = track
      var position = { lat, lng }

      return {
        title: name,
        position: { lat, lng },
        get content() {
          var content = document.createElement('marker-info-content')
          content.boardId = boardId
          content.data = {
            name,
            position,
            parameters
          }

          return content
        }
      }
    })

    openPopup(template, {
      backdrop: true,
      size: 'large',
      closable: true,
      title: i18next.t('title.track')
    })
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
            value: ~~(Math.random() * 100),
            updatedAt: Date.now() - ~~(Math.random() * 100000000)
          }
        })
    }
  }
}

window.customElements.define('report-humidity', ReportHumidity)
