import { Board } from '@things-factory/board-service'
import { Setting } from '@things-factory/setting-base'
import { getRepository } from 'typeorm'

const DASHBOARD_BOARD = 'dashboard'
const MARKER_IW_BOARD_FOR_TRACK = 'infowindow-board-for-track'
const MARKER_IW_BOARD_FOR_FLEET = 'infowindow-board-for-fleet'

export const boardSettingsResolver = {
  async boardSettings(_: any, params: any, context: any) {
    const queryBuilder = getRepository(Setting).createQueryBuilder()
    const names = [DASHBOARD_BOARD, MARKER_IW_BOARD_FOR_FLEET, MARKER_IW_BOARD_FOR_TRACK]

    var qb = queryBuilder
      .innerJoin(Board, 'Board', 'Setting.value = CAST(Board.id AS char(36))')
      .select([
        'Setting.id as id',
        'Setting.name as name',
        'Setting.value as value',
        'Board.id as boardId',
        'Board.name as boardName',
        'Board.description as boardDescription',
        'Board.thumbnail as boardThumbnail'
      ])
      .where('Setting.domain_id = :domain', { domain: context.state.domain.id })

    if (names && names.length) qb.andWhere('Setting.name IN (:...names)', { names })

    var boardSettingList = await qb.getRawMany()

    return boardSettingList.map(boardSetting => {
      var setting: any = {
        board: {}
      }

      for (let key in boardSetting) {
        if (key.includes('board')) {
          let originKey = key
          key = key.replace('board', '').toLowerCase()
          setting.board[key] = boardSetting[originKey]
        } else {
          setting[key] = boardSetting[key]
        }
      }

      return setting
    })
  }
}
