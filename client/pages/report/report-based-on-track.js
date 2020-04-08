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
import { getISO6709StringFromLatLng } from '../../commons/iso-6709'

import { MARKER_IW_BOARD_FOR_TRACK } from '../../actions/board-settings'

import { EVENT_ICONS } from '../../icons/event-marker-icons'

const EVENT_MARKER_SIZE = { width: 32, height: 32 }

export class ReportBasedOnTrack extends connect(store)(localize(i18next)(PageView)) {
  stateChanged(state) {
    this.trackBoardId = (state.boardSetting[MARKER_IW_BOARD_FOR_TRACK] || { board: {} }).board.id
  }

  showTrack() {
    var boardId = this.trackBoardId
    var template = document.createElement('track-popup')
    const icon = {
      path: 'M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0',
      fillColor: '#fff',
      fillOpacity: 1,
      anchor: new google.maps.Point(0, 0),
      strokeWeight: 2.5,
      strokeColor: '#3E9CFA',
      scale: 1,
    }

    template.tracks = fetchTrack().map((track) => {
      var { id, name, lat, lng, delivery, client, driver, updatedAt, parameters } = track

      var position = { lat, lng }

      return {
        title: name,
        position: { lat, lng },
        icon: ~~(Math.random() * 20)
          ? icon
          : {
              url: EVENT_ICONS[~~(Math.random() * 5)],
              scaledSize: EVENT_MARKER_SIZE,
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
            ISO6709: getISO6709StringFromLatLng(lat, lng),
            updatedAt: new Date(updatedAt).toLocaleString(),
            parameters,
          }

          return content
        },
      }
    })

    openPopup(template, {
      backdrop: true,
      size: 'large',
      closable: true,
      title: i18next.t('title.track'),
    })
  }

  async fetchHandler({ page, limit, sorters = [] }) {
    var chance = new Chance()
    var timestamp = Date.now()

    return await {
      total: 300,
      records: Array(50)
        .fill()
        .map(() => {
          var issued = timestamp - ~~(Math.random() * 100000000)
          var date = new Date(issued).toISOString().slice(0, 10)
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
            updatedAt: Date.now() - ~~(Math.random() * 100000000),
          }
        }),
    }
  }
}
