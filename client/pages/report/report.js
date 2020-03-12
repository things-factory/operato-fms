import { client, PageView, store } from '@things-factory/shell'
import { provider } from '@things-factory/board-ui'
import gql from 'graphql-tag'
import { css, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'

import { ScrollbarStyles } from '@things-factory/styles'
import { FMSPageStyles } from '../fms-page-style'

import '../../commons/common-search'

const NOOP = () => {}
const DASHBOARD = 'dashboard'

export class FMSReport extends connect(store)(PageView) {
  static get properties() {
    return {
      _board: Object,
      _boardId: String,
      _baseUrl: String,
      _license: Object,
      _showSpinner: Boolean
    }
  }

  static get styles() {
    return [
      ScrollbarStyles,
      FMSPageStyles,
      css`
        [main] {
          display: flex;
          flex-direction: column;

          width: 100%; /* 전체화면보기를 위해서 필요함. */
          height: 100%;

          overflow: hidden;
          position: relative;
        }

        board-viewer {
          flex: 1;
        }

        oops-spinner {
          display: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        oops-spinner[show] {
          display: block;
        }

        oops-note {
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `
    ]
  }

  get oopsNote() {
    return {
      icon: 'insert_chart_outlined',
      title: 'EMPTY BOARD',
      description: 'There are no board to be shown'
    }
  }

  render() {
    var oops = !this._showSpinner && !this._board && this.oopsNote

    return oops
      ? html`
          <common-search sidebar></common-search>
          <div main>
            <oops-note
              icon=${oops.icon}
              title=${oops.title}
              description=${oops.description}
              @click=${oops.click || NOOP}
            ></oops-note>
          </div>
        `
      : html`
          <common-search sidebar></common-search>

          <board-viewer main .board=${this._board} .provider=${provider}></board-viewer>
          <oops-spinner ?show=${this._showSpinner}></oops-spinner>
        `
  }

  updated(changes) {
    if (changes.has('_boardId')) {
      var boardViewerElement = this.shadowRoot.querySelector('board-viewer')
      boardViewerElement && boardViewerElement.closeScene()
      this.refresh()
    }

    if (changes.has('_license')) {
      if (scene && scene.license) scene.license(this._license.key)
    }
  }

  pageUpdated(changes, lifecycle) {
    if (this.active) {
      this._boardId = lifecycle.resourceId
    } else {
      this._boardId = null
      let boardViewer = this.shadowRoot.querySelector('board-viewer')
      boardViewer && boardViewer.closeScene()
    }
  }

  stateChanged(state) {
    this._baseUrl = state.app.baseUrl
    this._license = state.license

    this._boardId = (state.boardSetting[DASHBOARD] || { board: {} }).board.id
  }

  async refresh() {
    if (!this._boardId) {
      return
    }

    try {
      this._showSpinner = true
      this.updateContext()

      var response = await client.query({
        query: gql`
          query FetchBoardById($id: String!) {
            board(id: $id) {
              id
              name
              model
            }
          }
        `,
        variables: { id: this._boardId }
      })

      var board = response.data.board

      if (!board) {
        this._board = null
        throw 'board not found'
      }

      this._board = {
        ...board,
        model: JSON.parse(board.model)
      }
    } catch (ex) {
      document.dispatchEvent(
        new CustomEvent('notify', {
          detail: {
            level: 'error',
            message: ex,
            ex
          }
        })
      )
    } finally {
      this._showSpinner = false
      this.updateContext()
    }
  }
}

customElements.define('fms-report', FMSReport)
