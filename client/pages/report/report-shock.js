import { html, css } from 'lit-element'
import '@material/mwc-button'
import '@things-factory/grist-ui'
import { i18next } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'

import { ReportBasedOnTrack } from './report-based-on-track'
import '../../commons/fleet-search'

import { ReportStyles } from './report-style'

class ReportShock extends ReportBasedOnTrack {
  static get properties() {
    return {}
  }

  static get styles() {
    return [ScrollbarStyles, ReportStyles]
  }

  render() {
    return html`
      <fleet-search sidebar></fleet-search>

      <div main>
        <div header>
          <label><a href="fms-report">Report</a> > Shock</label>
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
          type: 'number',
          name: 'value',
          header: i18next.t('field.value') + '(g)',
          record: { editable: false, align: 'right' },
          imex: { header: i18next.t('field.value') + '(g)', key: 'value', width: 50, type: 'number' },
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

window.customElements.define('report-shock', ReportShock)
