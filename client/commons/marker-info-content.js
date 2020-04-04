import { LitElement, html, css } from 'lit-element'
import '@material/mwc-linear-progress'
import { client } from '@things-factory/shell'
import gql from 'graphql-tag'
import { provider } from '@things-factory/board-ui'

/**
 * 구글맵 마커 인포윈도우용 컨텐트
 * - 인포윈도우에 things-scene을 활용한다.
 * - 해당보드 인스턴스 하나를 모든 인포윈도우에서 공유한다. (provider를 사용하기 때문)
 * - 즉, MarkerInfoContent는 마커당 하나의 인스턴스가 만들어지지만, scene은 하나의 인스턴스를 공유한다.
 * - 만약, 여러 인스턴스 scene을 사용하고 싶다면, 다른 방법을 사용해야 한다.
 */
export class MarkerInfoContent extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
        }

        #viewer {
          width: 100%;
          height: 100%;
        }

        mwc-linear-progress {
          margin: 13px;
          width: 200px;
        }
      `
    ]
  }

  static get properties() {
    return {
      data: Object,
      board: Object,
      boardId: String
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.show()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.hide()
  }

  render() {
    return html`
      <board-viewer
        id="viewer"
        .board=${this.board}
        .data=${this.data}
        .provider=${provider}
        hide-fullscreen
        hide-navigation
      ></board-viewer>

      ${this.board
        ? html``
        : html`
            <mwc-linear-progress indeterminate></mwc-linear-progress>
          `}
    `
  }

  /*
   * FIXME
   * __board_about_to_be_desctroied__ 를 사용하는 이유는
   * things-board의 reference-map이 async 대응에 문제가 있어서 (같은 아이디의 board을 빠르게 중복 요청하는 경우)
   * 임시 대응함.
   */
  async hide() {
    if (this.__about_to_create_board__) {
      this.__about_to_create_board__ = false
    }

    if (this.board) {
      this.board = null
    }
  }

  async show() {
    if (!this.boardId) {
      return
    }

    try {
      if (!this.board) {
        this.__about_to_create_board__ = true
        const response = await client.query({
          query: gql`
            query FetchBoardById($id: String!) {
              board(id: $id) {
                id
                name
                model
              }
            }
          `,
          variables: { id: this.boardId }
        })

        const board = response.data.board

        this.board = {
          ...board,
          model: JSON.parse(board.model)
        }
        if (!this.__about_to_create_board__) {
          this.board = null
          return
        }
        this.__about_to_create_board__ = false

        let { width, height } = this.board.model
        this.setAttribute('style', `width:${width}px;height:${height}px`)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

customElements.define('marker-info-content', MarkerInfoContent)
