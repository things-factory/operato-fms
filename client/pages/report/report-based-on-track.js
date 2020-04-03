import { connect } from 'pwa-helpers/connect-mixin.js'
import '@material/mwc-button'
import '@material/mwc-textfield'
import { store, PageView } from '@things-factory/shell'
import '@things-factory/grist-ui'
import { i18next, localize } from '@things-factory/i18n-base'
import { openPopup } from '@things-factory/layout-base'
import Chance from 'chance'

import { fetchTrack } from '../../commons/fetch-track'
import '../../commons/fleet-search'
import '../../commons/track-popup'
import '../../commons/marker-info-content'

import { MARKER_IW_BOARD_FOR_TRACK } from '../../actions/board-settings'

import { EVENT_ICONS } from '../../icons/event-marker-icons'

const SCALED_SIZE = { width: 24, height: 24 }

export class ReportBasedOnTrack extends connect(store)(localize(i18next)(PageView)) {
  stateChanged(state) {
    this.trackBoardId = (state.boardSetting[MARKER_IW_BOARD_FOR_TRACK] || { board: {} }).board.id
  }

  showTrack() {
    var boardId = this.trackBoardId
    var template = document.createElement('track-popup')

    template.tracks = fetchTrack().map(track => {
      var { id, name, lat, lng, delivery, client, driver, parameters } = track

      var position = { lat, lng }

      return {
        title: name,
        position: { lat, lng },
        icon: {
          url: EVENT_ICONS[~~(Math.random() * 5)],
          scaledSize: SCALED_SIZE
        },
        get content() {
          var content = document.createElement('marker-info-content')
          content.boardId = boardId
          content.data = {
            id,
            name,
            delivery,
            client,
            driver,
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

  async fetchHandler({ page, limit, sorters = [] }) {
    var chance = new Chance()
    var date = new Date().toISOString().slice(0, 10)

    return await {
      total: 300,
      records: Array(50)
        .fill()
        .map(() => {
          var status = Math.random() - 0.5 > 0 ? 0 : 1
          var id = chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true })

          return {
            id,
            name: id,
            client: 'ebay',
            delivery: date + '-' + ~~(Math.random() * 1000),
            device: 'wizxyz-' + ~~(Math.random() * 10000),
            driver: chance.name(),
            value: ~~(Math.random() * 1500),
            updatedAt: Date.now() - ~~(Math.random() * 100000000)
          }
        })
    }
  }
}
